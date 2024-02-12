import React from 'react';
import ReactDOM from 'react-dom/client';
/* - Styles ________________________________ */
import './index.css';
/*__________________________________________ */
import App from './App';
/* - Packages ______________________________ */
import { BrowserRouter } from 'react-router-dom';
/*__________________________________________ */

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
