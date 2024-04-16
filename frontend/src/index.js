import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './config';

const msalInstance = new PublicClientApplication(msalConfig);

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0])
  console.log("Setting AD happended")
}

msalInstance.addEventCallback((message) => {
  if (message.eventType === EventType.LOGIN_SUCCESS || message.eventType === EventType.INITIALIZE_START) {
    const account = message.paylod.account;
    msalInstance.setActiveAccount(account);
    console.log("Login Success")
  } else {
    console.log(message)
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App instance={msalInstance}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
