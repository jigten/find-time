import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from './context/AuthContext';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
