import React from 'react';
import axios from 'axios';
import {GoogleLogin} from 'react-google-login';
import {CLIENT_ID} from '../../utils/constants';
import {GoogleLoginResponseOffline} from 'react-google-login';

type LoginProps = {
  setIsLoggedIn: (loggedIn: boolean) => void;
};

export const Login: React.FC<LoginProps> = (props) => {
  const {setIsLoggedIn} = props;

  const onSuccess = async (googleData: GoogleLoginResponseOffline) => {
    const {data} = await axios.post('http://localhost:3001/user/register', {
      code: googleData.code,
    });

    if (data) {
      setIsLoggedIn(true);
    }
  };

  const onFailure = (googleData: GoogleLoginResponseOffline) => {
    console.dir(`Login failed, res: ${googleData}`);
  };

  return (
    <div>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText='Login'
        scope='profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly'
        onSuccess={onSuccess}
        onFailure={onFailure}
        accessType='offline'
        responseType='code'
        style={{marginTop: '100px'}}
        isSignedIn={true}
      />
    </div>
  );
};
