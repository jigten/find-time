import React, {useState} from 'react';
import {Login, Logout} from './Authentication';
import {StepWizard} from './StepWizard';
import styles from './Landing.scss';

export const Landing: React.FC<{}> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className={styles.body}>
      {isLoggedIn ? (
        <>
          <Logout setIsLoggedIn={setIsLoggedIn} />
          <StepWizard />
        </>
      ) : (
        <>
          <p>To start using FindTime, you need to login with your Google account</p>
          <Login setIsLoggedIn={setIsLoggedIn} />
        </>
      )}
    </div>
  );
};
