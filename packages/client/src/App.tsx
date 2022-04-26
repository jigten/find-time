import React, {useContext} from 'react';
import {Landing} from './components';
import {AuthContext} from './context/AuthContext';
import {Login} from './components/Authentication';
import styles from './App.scss';

const App: React.FC = () => {
  const [user, setUser] = useContext(AuthContext);

  return (
    <>
      {user ? (
        <Landing />
      ) : (
        <div className={styles.body}>
          <p>To start using FindTime, you need to login with your Google account</p>
          <Login setUser={setUser} />
        </div>
      )}
    </>
  );
};

export default App;
