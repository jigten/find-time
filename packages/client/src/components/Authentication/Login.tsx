import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {GoogleLogin} from 'react-google-login';
import {CLIENT_ID, TOKEN_KEY} from '../../utils/constants';
import {GoogleLoginResponseOffline} from 'react-google-login';

type LoginProps = {
  setUser: (user) => void;
};

export const Login: React.FC<LoginProps> = (props) => {
  const {setUser} = props;

  const onSuccess = async (googleData: GoogleLoginResponseOffline) => {
    const {data} = await axios.post('http://localhost:3001/users/register', {
      code: googleData.code,
    });

    if (data) {
      const {idToken} = data;
      localStorage.setItem(TOKEN_KEY, idToken);
      setUser(jwtDecode(idToken));
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
