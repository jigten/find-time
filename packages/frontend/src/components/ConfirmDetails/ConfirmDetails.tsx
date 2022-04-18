import React from 'react';
import { Guest } from '../GuestPicker';
import { formatDateTime } from '../../utils/formatDateTime';

type ConfirmDetailsProps = {
	finalSchedule: Date[];
	finalGuests: Guest[];
	jumpToStep?: (step: number) => void;
};

export const ConfirmDetails: React.FC<ConfirmDetailsProps> = (props) => {
	const { jumpToStep, finalSchedule, finalGuests } = props;
	const handleContinue = () => {
		jumpToStep(3);
	};

	return (
		<>
			<p>
				Desired meeting schedule is {formatDateTime(finalSchedule[0], finalSchedule[1])}
			</p>
			<button
				onClick={() => {
					jumpToStep(0);
				}}>
				Edit schedule
			</button>
			<p>Guest list: {finalGuests.map((guest) => guest.email).join(', ')}</p>
			<button
				onClick={() => {
					jumpToStep(1);
				}}>
				Edit guest list
			</button>
			<br />
			<button onClick={handleContinue}>Find Time!</button>
		</>
	);
};
