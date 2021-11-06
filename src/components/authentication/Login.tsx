import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '../../utils/constants';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export const Login: React.FC = () => {
	const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		if ('profileObj' in res) {
			console.log('Login sucess, currentUser:');
			console.dir(res.profileObj);
		}
	};

	const onFailure = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		console.dir(`Login failed, res: ${res}`);
	};

	return (
		<div>
			<GoogleLogin
				clientId={CLIENT_ID}
				buttonText="Login"
				onSuccess={onSuccess}
				onFailure={onFailure}
				style={{ marginTop: '100px' }}
				isSignedIn={true}
			/>
		</div>
	);
};
