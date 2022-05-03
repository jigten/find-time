import React from 'react';
import {useQuery} from 'react-query';
import {Guest} from '../GuestPicker';
import {fetchAvailableMeetingTimes} from './queries';

type ConfirmDetailsProps = {
  finalSchedule: Date[];
  finalGuests: Guest[];
  meetingDuration: number;
};

export const AvailableMeetings: React.FC<ConfirmDetailsProps> = (props) => {
  const {finalSchedule, finalGuests, meetingDuration} = props;
  const {data, isLoading} = useQuery(['meetings', finalSchedule, finalGuests], () =>
    fetchAvailableMeetingTimes(finalGuests, finalSchedule, meetingDuration),
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>List of all availble time slots</p>
      {JSON.stringify(data, null, 2)}
    </>
  );
};
