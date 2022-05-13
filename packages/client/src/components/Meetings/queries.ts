import {Guest} from '../GuestPicker';
import api from '../../utils/api';

export const fetchAvailableMeetingTimes = async (
  finalGuests: Guest[],
  finalSchedule: Date[],
  meetingDuration: number,
): Promise<any> => {
  const {data} = await api.post('/meetings/find-times', {
    finalGuests,
    finalSchedule,
    meetingDuration,
  });

  return data;
};
