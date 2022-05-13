import axios from 'axios';
import express from 'express';
import {authenticate} from '../middlewares/AuthMiddleware';
import {getCalendarEvents, calculateFreeTimes} from '../utils';

const router = express.Router();
router.use(authenticate);

router.post('/find-times', async (req, res) => {
  const {user} = req;
  const {finalGuests, finalSchedule, meetingDuration} = req.body;
  const {accessToken, profile} = user;
  const emails = finalGuests.map((guest: {email: string}) => guest.email);
  const [timeMin, timeMax] = finalSchedule;
  try {
    const times = await getCalendarEvents([...emails, profile.email], timeMin, timeMax, accessToken);
    const freeTimes = calculateFreeTimes(times, finalSchedule, meetingDuration);

    res.json({
      data: freeTimes,
    });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      res.status(401).json({
        error: 'Invalid access token',
      });
    }
  }
});

export default router;
