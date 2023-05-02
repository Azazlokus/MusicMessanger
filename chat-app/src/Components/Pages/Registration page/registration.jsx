import React from 'react';
import './registration.css';
import logo from '../../../image/Logo.png'
import them from '../../../image/theam.png'
import MyInput from "../../UI/inputs/myInput";
import MySelect from "../../UI/selectList/mySelect";
import MyButton from "../../UI/btns/myButton";
import {Link} from "react-router-dom";

function Registration(props) {
    return (
        <div className={'reg'}>
            <div className={'reg__container'}>
                <div className={'reg__content'}>
                    <img className={'reg__logo'} alt={'Logo'} src={logo}/>

                    <div className={'reg__text'}>
                        <h1 className={'reg__text_title'}>welcome to</h1>
                        <h1 className={'reg__text_name'}>chat</h1>
                    </div>

                    <div className={'reg__inputs'}>
                        <MyInput text={'Azamat228'} type={'text'} title={'user name'}/>
                        <MyInput text={'Baxit@gmail.com'} type={'email'} title={'email'}/>
                        <MySelect name1={'Male'} name2={'Female'} title={'gender'}/>
                        <MyInput type={'date'} title={'date of birthday'}/>
                        <MyInput text={'+74325674321'} type={'tel'} title={'phone'}/>
                    </div>

                    <div className={'reg__btns'}>
                        <Link to={'/LocalPage'}>
                            <MyButton type={'submit'} text={'registration'}/>
                        </Link>
                        <Link to={'/'}>
                            <MyButton text={'log In'}/>
                        </Link>
                    </div>
                </div>

                <div data-testid={'regist-them'} className={'reg__them'}>
                    <img className={'reg__them_img'} alt={'BigLogo'} src={them}/>
                </div>
            </div>
        </div>
    );
}

export default Registration;