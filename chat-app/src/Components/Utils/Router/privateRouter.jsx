import React from 'react';
import {Navigate ,Outlet} from 'react-router-dom'

function PrivateRoute() {  // Функция для проверки регистрации пользователя
    const token = true    // Если у пользователя есть токен, то он будет попадать сразу на страницу с чатами если нету (false), тогда на loginPage

    return ( 
        token ? <Outlet/>: <Navigate to="logIn"/>
    );
}

export default PrivateRoute;