import React, {useState} from 'react';
import StepZilla from 'react-stepzilla';
import {SchedulePicker} from '../SchedulePicker';
import {Guest, GuestPicker} from '../GuestPicker';
import {ConfirmDetails} from '../ConfirmDetails';
import './StepWizard.scss';

export const StepWizard: React.FC = (props) => {
  const [finalSchedule, setFinalSchedule] = useState([new Date(), new Date()]);
  const [finalGuests, setFinalGuests] = useState<Guest[]>([]);

  const steps = [
    {
      name: 'Meeting Schedule',
      component: <SchedulePicker finalSchedule={finalSchedule} setFinalSchedule={setFinalSchedule} />,
    },
    {
      name: 'Guests',
      component: <GuestPicker finalGuests={finalGuests} setFinalGuests={setFinalGuests} />,
    },
    {
      name: 'Confirm Details',
      component: <ConfirmDetails finalSchedule={finalSchedule} finalGuests={finalGuests} />,
    },
  ];

  return <StepZilla stepsNavigation={false} showNavigation={false} steps={steps} />;
};
