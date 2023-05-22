import React from 'react';
import logo from '../../../Img/Logo.png';
import './Auth.css';
import MyInput from "../../UI/Input/MyInput";
import MyButton from "../../UI/Button/MyButton";
import {Link} from "react-router-dom";

const Auth = () => {
    return (
        <div className={'auth__wrapper'}>
            <section className={'auth__container'}>
                <img className={'auth__logo'} src={logo} alt={'Logo'}/>

                <div className={'auth__title'}>
                    <h1 className={'auth__title_welcome'}>welcome to</h1>
                    <h1 className={'auth__title_name'}>chat</h1>
                </div>

                <div className={'auth__inputs'}>
                    <MyInput  title={'email'} type={'email'}/>
                    <MyInput  type={'password'} title={'password'}/>
                </div>

                <div className={'auth__btn'}>
                    <MyButton buttonText={'log in'} type={'submit'}/>
                    <Link to={'/registration'}>
                        <MyButton buttonText={'REGISTRATION'}/>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Auth;