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
  const times = await getCalendarEvents([...emails, profile.email], timeMin, timeMax, accessToken);
  const freeTimes = calculateFreeTimes(times, finalSchedule, meetingDuration);
  console.log('freeTimes: ', freeTimes);
  res.json({
    data: times,
  });
});

export default router;
