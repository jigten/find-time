import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { CLIENT_ID } from '../../utils/constants';

export const Logout: React.FC = () => {
	const onSuccess = () => {
		alert('Logged out succesfully');
	};
	return (
		<div>
			<GoogleLogout
				clientId={CLIENT_ID}
				buttonText="Logout"
				style={{ marginTop: '100px' }}
				onLogoutSuccess={onSuccess}
			/>
		</div>
	);
};
