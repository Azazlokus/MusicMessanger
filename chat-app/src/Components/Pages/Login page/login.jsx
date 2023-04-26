import React from 'react';
import '../../Pages/Login page/login.css';
import logo from '../../../image/Logo.png'
import MyInput from "../../UI/inputs/myInput";
import MyButton from "../../UI/btns/myButton";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div className={'login'}>
            <div className={'login__container'}>
                <img className={'login__logo'} src={logo} alt={'Logo'}/>

                <div className={'login__text'}>
                    <h1 className={'login__text_title'}>wellcome to</h1>
                    <h1 className={'login__text_name'}>chat</h1>
                </div>

                <div className={'login__inputs'}>
                    <MyInput type={'email'} title={'LOGIN'}/>
                    <MyInput type={'password'} title={'PASSWORD'} />
                </div>

                <div className={'login__btns'}>
                    <Link to={'/'}>
                        <MyButton text={'log in'}/>
                    </Link>
                    <Link to={'Regist'}>
                        <MyButton text={'registration'}/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;