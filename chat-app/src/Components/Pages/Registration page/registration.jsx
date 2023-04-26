import React from 'react';
import './registration.css';
import logo from '../../../image/Logo.png'
import theam from '../../../image/theam.png'
import MyInput from "../../UI/inputs/myInput";
import MySelect from "../../UI/selectList/mySelect";
import MyButton from "../../UI/btns/myButton";
import {Link} from "react-router-dom";

function Registration(props) {
    return (
        <div className={'reg__container'}>
            <div className={'reg__content'}>
                <img className={'reg__logo'} alt={'Logo'} src={logo}/>

                <div className={'reg__text'}>
                    <h1 className={'reg__text_title'}>wellcome to</h1>
                    <h1 className={'reg__text_name'}>chat</h1>
                </div>

                <div className={'reg__inputs'}>
                    <MyInput/>
                    <MyInput/>
                    <MySelect/>
                    <MyInput/>
                    <MyInput/>
                </div>

                <div className={'reg__btns'}>
                    <Link to={'/'}>
                        <MyButton/>
                    </Link>
                    <Link to={'/'}>
                        <MyButton/>
                    </Link>
                </div>
            </div>

            <div className={'reg__theam'}>
                <img alt={'BigLogo'} src={theam}/>
            </div>
        </div>
    );
}

export default Registration;