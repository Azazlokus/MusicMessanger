import React from 'react';
import "../Registr/register.css"
import Title from '../UI/Title/title';
import { Link } from 'react-router-dom'
import MyInput from '../UI/inputs/myInput';
import MyButton from '../UI/btns/myButton';
import MySelect from '../UI/selectList/mySelect';


function Regist() {
    return (
        <div>
            <div className="reg__container">
                <div className='reg__form'>
                    <section className="reg__form_container">
                        <Title title='Sign Up to Chatty!' text='Registration' />

                        <ul className="reg__form">
                            <MyInput title="Email" type="email" text="Input email" />
                            <MyInput title="Create password" type="password" text="Create password" />
                            <MyInput title="Password confirmation" type="password" text="Password confirmation" />
                            <MyInput title="Nickname" type="text" text="Nickname" />
                            <div className='reg__radio'>
                                <MySelect title="Your gender" name1="Male" name2="Female" />
                            </div>
                        </ul>

                        <div className="form__btns">
                            <Link to ="/">
                                <MyButton className='logIn__btn' text='Registration' />
                            </Link>
                            <Link to="/">
                                <MyButton className='reg__btn' text='Log in' />
                            </Link>
                        </div>
                    </section>
                </div>


                <div className="logIn__background"></div>
            </div>
        </div>
    );
}

export default Regist;