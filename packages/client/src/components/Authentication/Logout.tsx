import React from 'react';
import {GoogleLogout} from 'react-google-login';
import {CLIENT_ID} from '../../utils/constants';

type LogoutProps = {
  setIsLoggedIn: (loggedIn: boolean) => void;
};

export const Logout: React.FC<LogoutProps> = (props) => {
  const {setIsLoggedIn} = props;
  const onSuccess = () => {
    setIsLoggedIn(false);
  };
  return (
    <div>
      <GoogleLogout clientId={CLIENT_ID} buttonText='Logout' style={{marginTop: '100px'}} onLogoutSuccess={onSuccess} />
    </div>
  );
};
