//LogIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Выполнить POST-запрос на сервер, передав данные formData
      const response = await Axios.post('http://localhost:3000/api/auth/signin', formData);
      console.log('Ответ от сервера:', response.data);

      const token = response.data.accessToken; // Получаем токен из ответа

      // Устанавливаем заголовок Authorization для всех будущих запросов
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Сохр.токен в хранилище на стороне клиента
      localStorage.setItem("token", token);
      
      // После успешного входа, перенаправить 
      navigate('/api/main', { state: { token }, replace: true });
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div>
      <h2>SignIn</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            className="form-control custom-width"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className ="form-control custom-width"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary button-m">Submit</button>
        <div></div>
        <Link to="/signup" className="btn btn-success">SignUp</Link>
      </form>
    </div>
  );
}

export default Login;