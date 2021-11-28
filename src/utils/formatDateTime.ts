export const formatDateTime = (fromDate: Date, toDate: Date) => {
	return `${fromDate.toDateString()} at 
						${fromDate.toTimeString()} to ${toDate.toDateString()} at 
						${toDate.toTimeString()}`;
};
