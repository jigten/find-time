import React, {useContext} from 'react';
import {Logout} from './Authentication';
import {StepWizard} from './StepWizard';
import styles from './Landing.scss';
import {AuthContext} from '../context/AuthContext';

export const Landing: React.FC<{}> = () => {
  const [user, setUser] = useContext(AuthContext);
  console.log('user: ', user);

  return (
    <div className={styles.body}>
      <p>
        Hi {user.profile.name} <img src={user.profile.picture} />
      </p>
      <Logout setUser={setUser} />
      <StepWizard />
    </div>
  );
};
