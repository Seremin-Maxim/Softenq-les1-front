/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <App/>
  </React.StrictMode>,
)
*/
/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router, Route, Switch } from 'react-router-dom';
import LogIn from './LogIn.jsx'; // Импортируйте компонент Login
import Registration from './RegistrationForm.jsx';
import AppIn from './AppIn.jsx'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogIn from './LogIn';
import RegistrationForm from './RegistrationForm';
import App from './App'; // Импортируйте компонент App
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Page from './page';

function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");
  if (token) {
    return element;
  } else {
    return <Navigate to="/signin" replace />;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/signin" element={<LogIn />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/api/main" element={<PrivateRoute element={<Page />} />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </Router>
    
  </React.StrictMode>
);
