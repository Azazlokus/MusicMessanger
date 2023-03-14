import React, { useState } from 'react';
import '../Log_in/login.css';
import { Link } from 'react-router-dom'
import Title from '../UI/Title/title';
import MyInput from '../UI/inputs/myInput';
import MyButton from '../UI/btns/myButton';

function LogIn() {
    return (
        <div className="logIn__container">
            <div className='logIn__form'>
                <section className="logIn__form_container">
                    <Title text="Please, autorize yourself" title="Wellcome to Chatty!" />

                    <ul className="logIn__form">
                        <MyInput title="Email" type="email" text="Input user name" />
                        <MyInput title="Password" type="password" text="Input password" />
                    </ul>

                    <div className="form__btns">
                        <Link to="/">
                            <MyButton className='logIn__btn' text='Log in' />
                        </Link>
                        <Link to="Regist">
                            <MyButton className='reg__btn' text='Registration' />
                        </Link>
                    </div>
                </section>
            </div>


            <div className="logIn__background"></div>
        </div>
    );
}

export default LogIn;