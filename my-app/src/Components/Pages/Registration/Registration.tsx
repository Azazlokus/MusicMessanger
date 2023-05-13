import React from 'react';
import './Registration.css';
import logo from '../../../Img/Logo.png';
import MyInput from "../../UI/Input/MyInput";
import MySelect from "../../UI/MySelect/MySelect";
import MyButton from "../../UI/Button/MyButton";

const Registration = () => {
    return (
        <div className={'reg__wrapper'}>
            <div className={'reg__content'}>
                <img src={logo} alt={'Logo'}/>

                <div className={'reg__inputs'}>
                    <MyInput placeholder={'Jonh2002'} type={'text'} title={'user name'}/>
                    <MyInput placeholder={'John@002@gmail.com'} type={'email'} title={'email'}/>
                    <MySelect title={'gender'}/>
                    <MyInput type={'date'} title={'date of birthday'}/>
                    <MyInput placeholder={'+79453423567'} type={'phone'} title={'phone'}/>
                    <MyInput placeholder={'ZffweeWe123'} type={'password'} title={'password'}/>
                </div>

                <div className={'reg__btn'}>
                    <MyButton buttonText={'registration'}/>
                    <MyButton buttonText={'log in'}/>
                </div>
            </div>

            <div className={'reg__other'}></div>
        </div>
    );
};

export default Registration;