import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { SnackbarProvider } from 'notistack';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId="44417250238-1uvbpn20rd6ebkk0oc1na4kvk025dajr.apps.googleusercontent.com">;
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </Provider>
    </GoogleOAuthProvider>
      </React.StrictMode>,
  document.getElementById('root')
);