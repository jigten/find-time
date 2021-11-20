import React from 'react';
import { Login, Logout } from './authentication';
import styles from './Landing.scss';

export const Landing: React.FC<{}> = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const [accessToken, setAccessToken] = React.useState<string>('');

	return (
		<div className={styles.body}>
			{isLoggedIn ? (
				<Logout setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken} />
			) : (
				<>
					<p>To start using FreeTime, you need to login with your Google account</p>
					<Login setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken} />
				</>
			)}
		</div>
	);
};
