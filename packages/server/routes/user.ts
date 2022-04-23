import express from 'express';
import {PrismaClient} from '@prisma/client';
import {google} from 'googleapis';

const router = express.Router();
const prisma = new PrismaClient();
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
);

router.post('/register', async (req, res) => {
  const {code} = req.body;

  // Verify Google ID token
  try {
    const {tokens} = await oauth2Client.getToken(code);
    const {id_token, refresh_token} = tokens;

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

    if (!refresh_token) {
      // If refresh token is not provided, the user has already signed up before
      return res.json(payload);
    }

    // Create user
    const user = await prisma.users.create({
      data: {
        email: payload.email!,
        name: payload.name,
        picture: payload.picture,
        refreshToken: refresh_token,
      },
    });

    return res.json(user);
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return res.status(500).json({error: 'Error verifying ID token'});
  }
});

export default router;
