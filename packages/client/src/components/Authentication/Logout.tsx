import React from 'react';
import {GoogleLogout} from 'react-google-login';
import {CLIENT_ID, TOKEN_KEY} from '../../utils/constants';

type LogoutProps = {
  setUser: (user?) => void;
};

export const Logout: React.FC<LogoutProps> = (props) => {
  const {setUser} = props;
  const onSuccess = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };
  return (
    <div>
      <GoogleLogout clientId={CLIENT_ID} buttonText='Logout' style={{marginTop: '100px'}} onLogoutSuccess={onSuccess} />
    </div>
  );
};
