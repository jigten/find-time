import React from 'react';
import {GoogleLogout} from 'react-google-login';
import {CLIENT_ID} from '../../utils/constants';

type LogoutProps = {
  setIsLoggedIn: (loggedIn: boolean) => void;
  setAccessToken: (accessToken: string) => void;
};

export const Logout: React.FC<LogoutProps> = (props) => {
  const {setIsLoggedIn, setAccessToken} = props;
  const onSuccess = () => {
    setIsLoggedIn(false);
    setAccessToken('');
  };
  return (
    <div>
      <GoogleLogout clientId={CLIENT_ID} buttonText='Logout' style={{marginTop: '100px'}} onLogoutSuccess={onSuccess} />
    </div>
  );
};
