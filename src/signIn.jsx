import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const handleIn = async (e) => {
  e.preventDefault();
  try {
    // Отправка данных на сервер
    await Axios.post('http://localhost:3000/api/auth/signup', formData);
    // Перенаправление на другую страницу
    navigate('/dashboard'); // Замените '/dashboard' на нужный URL
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
  }
};
function InForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

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
      const response = await Axios.get('http://localhost:3000/api/auth/signin', formData);
      console.log('Ответ от сервера:', response.data);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Войти</button>
        <button type="submit" onClick={handleIn}>Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default InForm;
