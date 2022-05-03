import React, {useState} from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import './SchedulePicker.scss';
import styles from './SchedulePicker.scss';
import {formatDateTime} from '../../utils/formatDateTime';

type SchedulePickerProps = {
  finalSchedule: Date[];
  meetingDuration: number;
  setFinalSchedule: (date: Date[]) => void;
  setMeetingDuration: (duration: number) => void;
  jumpToStep?: (step: number) => void;
};

export const SchedulePicker: React.FC<SchedulePickerProps> = (props) => {
  const {finalSchedule, setFinalSchedule, meetingDuration, setMeetingDuration, jumpToStep} = props;
  const [schedule, onChangeSchedule] = useState(finalSchedule);
  const [duration, onChangeDuration] = useState(meetingDuration);

  const handleContinue = () => {
    setFinalSchedule(schedule);
    setMeetingDuration(duration);
    jumpToStep(1);
  };
  return (
    <>
      <DateTimeRangePicker rangeDivider={' to '} onChange={onChangeSchedule} value={schedule} /> <br />
      Meeting duration:{' '}
      <input type='number' value={duration} onChange={(e) => onChangeDuration(parseInt(e.target.value))} /> minutes
      {schedule && (
        <div>
          <p className={styles.messageText}>
            Your desired schedule is between {formatDateTime(schedule[0], schedule[1])}
          </p>
          <button onClick={handleContinue}>Continue</button>
        </div>
      )}
    </>
  );
};
