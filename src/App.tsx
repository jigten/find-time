import React from 'react';
import { Login, Logout } from './components/authentication';

const App: React.FC<{}> = () => {
	return (
		<>
			<Login />
			<Logout />
		</>
	);
};

export default App;
