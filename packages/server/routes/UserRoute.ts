import express from 'express';
import {PrismaClient} from '@prisma/client';
import {google} from 'googleapis';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import {authenticate} from '../middlewares/AuthMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const {code} = req.body;

  // Verify Google ID token
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'postmessage',
    );

    const {tokens} = await oauth2Client.getToken(code);
    const {id_token, refresh_token, access_token} = tokens;

    if (!id_token) {
      return res.status(400).json({
        error: 'Invalid Google ID token',
      });
    }

    const payload = (await oauth2Client.verifyIdToken({idToken: id_token})).getPayload();
    if (!payload) {
      return res.status(400).json({
        error: 'Invalid Google ID token',
      });
    }

    const user = await prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user && !refresh_token) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    if (user) {
      if (!refresh_token) {
        return res.json({
          idToken: jwt.sign(
            {
              id: user.id,
              profile: {email: user.email, name: user?.name, picture: user?.picture},
              accessToken: access_token,
            },
            process.env.JWT_SECRET!,
          ),
        });
      }

      // Update user with new refresh token
      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: refresh_token,
        },
      });

      return res.json({
        idToken: jwt.sign(
          {
            id: user.id,
            profile: {email: user.email, name: user?.name, picture: user?.picture},
            accessToken: access_token,
          },
          process.env.JWT_SECRET!,
        ),
      });
    }
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return res.status(500).json({error: 'Error verifying ID token'});
  }
});

router.get('/refresh-token', authenticate, async (req, res) => {
  const {user} = req;

  const existingUser = await prisma.users.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!existingUser) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  const {refreshToken} = existingUser;
  try {
    const response = await axios.post('https://accounts.google.com/o/oauth2/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    const {access_token} = response.data;
    return res.json({
      idToken: jwt.sign(
        {
          id: user.id,
          profile: {email: user.email, name: user?.name, picture: user?.picture},
          accessToken: access_token,
        },
        process.env.JWT_SECRET!,
      ),
    });
  } catch (err) {
    console.log('err: ', err);
  }
});

export default router;
