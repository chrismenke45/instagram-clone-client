import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css'
import './index.css';
import App from './App';
import {
  //BrowserRouter as Router,
  createHashRouter as Router,
  //Navigate
} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

