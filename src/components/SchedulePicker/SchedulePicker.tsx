import React, { useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import './SchedulePicker.scss';
import styles from './SchedulePicker.scss';
import { formatDateTime } from '../../utils/formatDateTime';

type SchedulePickerProps = {
	jumpToStep?: (step: number) => void;
};

export const SchedulePicker: React.FC<SchedulePickerProps> = (props) => {
	const { jumpToStep } = props;
	const [value, onChange] = useState([new Date(), new Date()]);
	return (
		<>
			<DateTimeRangePicker rangeDivider={' to '} onChange={onChange} value={value} />
			{value && (
				<div>
					<p className={styles.messageText}>
						Your desired schedule is between {formatDateTime(value[0], value[1])}
					</p>
					<button onClick={() => jumpToStep(1)}>Continue</button>
				</div>
			)}
		</>
	);
};
