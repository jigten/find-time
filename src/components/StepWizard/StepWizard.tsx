import React from 'react';
import StepZilla from 'react-stepzilla';
import { SchedulePicker } from '../SchedulePicker';
import { GuestPicker } from '../GuestPicker';
import './StepWizard.scss';

export const StepWizard: React.FC = (props) => {
	const steps = [
		{ name: 'Meeting Schedule', component: <SchedulePicker /> },
		{ name: 'Guests', component: <GuestPicker /> },
	];

	return <StepZilla showNavigation={false} steps={steps} />;
};
