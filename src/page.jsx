// page.jsx
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Page() {
  const [users, setUsers] = useState([]);

  // Извлечь токен из Local Storage
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (token) {
    // Если есть, устанавливаем токен в заголовок Axios
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    navigate('/', {replace: true });
    console.log('no tolen provided, u idiot!')
  }
  

  // Функция для загрузки списка пользователей
  const loadUsers = async () => {
    try {
      console.log('token: ', token);
      const response = await Axios.get('http://localhost:3000/api/users'/*, {state:{token}} */);
      console.log('Ответ от сервера:', response.data);

      setUsers(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    }
  }

  // Вызываем функцию для загрузки пользователей при монтировании компонента
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
