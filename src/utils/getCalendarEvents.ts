import axios from 'axios';
import { FREEBUSY_ENDPOINT } from './constants';

export const getCalendarEvents = async (
	emailIds: String[],
	timeMin: string,
	timeMax: string,
	accessToken: string
) => {
	const items = emailIds.map((emailId) => {
		return {
			id: emailId,
		};
	});

	const requestData = { timeMin, timeMax, items };

	try {
		const response = await axios.post(
			`${FREEBUSY_ENDPOINT}?access_token=${accessToken}`,
			requestData
		);
		return response.data['calendars'];
	} catch (error) {
		console.error('getCalendarEvents error:', error);
	}
};
