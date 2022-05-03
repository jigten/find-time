import React, {useState} from 'react';
import StepZilla from 'react-stepzilla';
import {SchedulePicker} from '../SchedulePicker';
import {Guest, GuestPicker} from '../GuestPicker';
import {ConfirmDetails} from '../ConfirmDetails';
import {AvailableMeetings} from '../Meetings/AvailableMeetings';
import './StepWizard.scss';

export const StepWizard: React.FC = () => {
  const [finalSchedule, setFinalSchedule] = useState([new Date(), new Date()]);
  const [finalGuests, setFinalGuests] = useState<Guest[]>([]);
  const [meetingDuration, setMeetingDuration] = useState(60);

  const steps = [
    {
      name: 'Meeting Schedule',
      component: (
        <SchedulePicker
          finalSchedule={finalSchedule}
          setFinalSchedule={setFinalSchedule}
          meetingDuration={meetingDuration}
          setMeetingDuration={setMeetingDuration}
        />
      ),
    },
    {
      name: 'Guests',
      component: <GuestPicker finalGuests={finalGuests} setFinalGuests={setFinalGuests} />,
    },
    {
      name: 'Confirm Details',
      component: <ConfirmDetails finalSchedule={finalSchedule} finalGuests={finalGuests} />,
    },
    {
      name: 'Available Meetings',
      component: (
        <AvailableMeetings finalSchedule={finalSchedule} finalGuests={finalGuests} meetingDuration={meetingDuration} />
      ),
    },
  ];

  return <StepZilla stepsNavigation={false} showNavigation={false} steps={steps} />;
};
