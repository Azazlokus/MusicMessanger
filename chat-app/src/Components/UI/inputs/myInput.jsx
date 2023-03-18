import React, { useState } from 'react';

function MyInput(props) {
    // Состояния для валидации
    const [login, setLogin] = useState('');
    const [loginVoid, setLoginVoid] = useState(false);
    const [loginError, setLoginError] = useState('The email field cannot be empty.')

    const [pass, setPass] = useState('');
    const [passVoid, setPassVoid] = useState(false);
    const [passError, setPassError] = useState('The password field cannot be empty.')

    //Валидация пароля и почты
    function handlerInput(e) {
        if (e.target.type === 'email') {
            setLogin(e.target.value)
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!re.test(String(e.target.value).toLowerCase())) {
                setLoginError("Incorrect email")
            } else {
                setLoginError("")
            }
        }
        else if (e.target.type === 'password') {
            setPass(e.target.value)
            if (e.target.value.length < 6 || e.target.value.length > 12) {
                setPassError('Incorrect password')
            } else {
                setPassError('')
            }
        }
    }

    //Вывод ошибки при не правильном вводе
    const blurHandler = (e) => {
        switch (e.target.type) {
            case 'email':
                setLoginVoid(true)
                break;

            case 'password':
                setPassVoid(true)
                break;
            default:
                break;
        }
    }

    return (
        <li className="item__input">
            <span className="logIn__item_title">{props.title}</span>

            {/* Ошибка для почты */}
            {(loginVoid && loginError) && <div style={{ color: 'red' }}>{loginError}</div>}
            {/* Ошибка для пароля */}
            {(passVoid && passError) && <div style={{color: 'red'}}>{passError}</div>} 
            <input id={props.id} onChange={handlerInput} type={props.type} onBlur={blurHandler} placeholder={props.text} className="logIn__item_input" />
        </li>
    );
}

export default MyInput;