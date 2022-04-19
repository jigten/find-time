import React from 'react';

import {GoogleLogin} from 'react-google-login';

import {CLIENT_ID} from '../../utils/constants';

import {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';

import {refreshTokenSetup} from '../../utils/refreshToken';

type LoginProps = {
  setIsLoggedIn: (loggedIn: boolean) => void;
  setAccessToken: (accessToken: string) => void;
};

export const Login: React.FC<LoginProps> = (props) => {
  const {setIsLoggedIn, setAccessToken} = props;

  const onSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('accessToken' in res) {
      setIsLoggedIn(true);

      setAccessToken(res.accessToken);

      refreshTokenSetup(res);
    }
  };

  const onFailure = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.dir(`Login failed, res: ${res}`);
  };

  return (
    <div>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText='Login'
        scope='profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly'
        onSuccess={onSuccess}
        onFailure={onFailure}
        style={{marginTop: '100px'}}
        isSignedIn={true}
      />
    </div>
  );
};
