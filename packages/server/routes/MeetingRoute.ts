import express from 'express';
import {authenticate} from '../middlewares/AuthMiddleware';
import {getCalendarEvents} from '../utils/getCalendarEvents';

const router = express.Router();
router.use(authenticate);

router.post('/find-times', async (req, res) => {
  const {user} = req;
  const {finalGuests, finalSchedule, meetingDuration} = req.body;
  const {accessToken, profile} = user;
  const emails = finalGuests.map((guest: {email: string}) => guest.email);
  const [timeMin, timeMax] = finalSchedule;
  const times = await getCalendarEvents([...emails, profile.email], timeMin, timeMax, accessToken);
  res.json({
    data: times,
  });
});

export default router;
