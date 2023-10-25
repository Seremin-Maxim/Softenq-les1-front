//AppIn.jsx
import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import RegistrationForm from './RegistrationForm';
import "./App.css";
const App = () => {
  const [data, setData] = useState("");

  const getData = async()=>{
    const response = await Axios.get("http://localhost:8000/api");
    setData(response.data);
  }


  useEffect(()=>{
    getData()
  },[]);

  return (
      <div>
        <Router>
        <Switch>
          <Route path="/signin" component={LogIn} />
          <Route path="/signup" component={RegistrationForm} />
          <Route path="/" component={DefaultComponent} /> {/* Компонент по умолчанию */}
          </Switch>
      </Router>
      </div>
      
  )
}

export default App;

