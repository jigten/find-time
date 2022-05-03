import axios from 'axios';
import {TOKEN_KEY} from '../../utils/auth';
import {Guest} from '../GuestPicker';

export const fetchAvailableMeetingTimes = async (
  finalGuests: Guest[],
  finalSchedule: Date[],
  meetingDuration: number,
): Promise<any> => {
  const idToken = localStorage.getItem(TOKEN_KEY);

  const {data} = await axios.post(
    'http://localhost:3001/meetings/find-times',
    {
      finalGuests,
      finalSchedule,
      meetingDuration,
    },
    {headers: {Authorization: `Bearer ${idToken}`}},
  );

  return data;
};
