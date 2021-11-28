import React from 'react';
import StepZilla from 'react-stepzilla';
import { SchedulePicker } from '../SchedulePicker';
import './StepWizard.scss';

export const StepWizard: React.FC = (props) => {
	const steps = [{ name: 'Meeting Schedule', component: <SchedulePicker /> }];

	return <StepZilla showNavigation={false} steps={steps} />;
};
