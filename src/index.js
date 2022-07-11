import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MsgProvider } from './Components/context/MsgContext';
import { LoggedInProvider } from './Components/context/LoggedInContext';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <React.StrictMode>
    <LoggedInProvider>
    <MsgProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </MsgProvider>
    </LoggedInProvider>
  </React.StrictMode>
);