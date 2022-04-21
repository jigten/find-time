import React, {useState} from 'react';
import {Login, Logout} from './Authentication';
import {StepWizard} from './StepWizard';
import styles from './Landing.scss';

export const Landing: React.FC<{}> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');

  return (
    <div className={styles.body}>
      {isLoggedIn ? (
        <>
          <Logout setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken} />
          <StepWizard />
        </>
      ) : (
        <>
          <p>To start using FreeTime, you need to login with your Google account</p>
          <Login setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken} />
        </>
      )}
    </div>
  );
};
