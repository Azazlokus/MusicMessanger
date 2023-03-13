import React from 'react';
import '../Log_in/login.css';
import MyButtonLogin from '../UI/btns/btnLogin';
import MyButtonRegist from '../UI/btns/btnRegistr';
import MyInputLogin from '../UI/inputs/inputLogin';
import MyInputPass from '../UI/inputs/inputPass';

function LogIn() {
    return ( 
        <div className="logIn__container">
            <div className='logIn__form'>
                <section className="logIn__form_container">
                    <img src="/img/LogIn__logo.png" alt="Logo" className="logIn__logo"/>
                    
                    <div className="logIn__text">
                        <h1 className="logIn__title">Wellcome to Chatty!</h1>
                        <p className="logIn__title_text">Please, autorize yourself</p>
                    </div>
                    
                    <ul className="logIn__form">
                        <li className="logIn__form_item item">
                            <span className="logIn__item_title">User name</span>
                            <MyInputLogin/>    
                        </li>
                        <li className="logIn__form_item item">
                            <span className="logIn__item_title">Password</span>
                            <MyInputPass/>
                        </li>
                    </ul>
                    
                    <div className="form__btns">
                        <MyButtonLogin/>
                        <MyButtonRegist/>
                    </div>
                </section>
            </div>
            
            
            <div className="logIn__background"></div>
        </div>
    );
}

export default LogIn;