import React, {FC} from 'react';
import Header from "../../UI/Header/Header";
import ava from '../../../Img/Avatar.png'
import './Chat.css';
import Message from "./Message";
import {useAuth} from "../../Provider/useAuth";

const Chat:FC = () => {
    const {users} = useAuth()
    return (
        <>
            <Header/>
            <div className={'chat__content'}>
                <div className={'chat__sidebar'}>
                    <input className={'chat__sidebar_input'}/>
                    <ul className={'chat__sidebar_users'}>
                        {users.map(usr => (
                            <li key={usr._id} className={'chat__sidebar_user'}>
                                <img className={'chat__sidebar_avatar'} src={usr.avatar} alt={"Avatar"}/>

                                <div className={'chat__user_info'}>
                                    <h2 className={'chat__user_name'}>{usr.name}</h2>
                                    <p className={'chat__user_last-message'}>Hey!</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={'chat__dialogs'}>
                    <Message/>
                </div>
            </div>
        </>
    );
};

export default Chat;