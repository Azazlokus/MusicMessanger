import React, {FC} from 'react';
import Header from "../../UI/Header/Header";
import ava from '../../../Img/Avatar.png'
import './Chat.css';

const Chat:FC = () => {
    return (
        <>
            <Header/>
            <div className={'chat__content'}>
                <div className={'chat__sidebar'}>
                    <input className={'chat__sidebar_input'}/>
                    <ul className={'chat__sidebar_users'}>
                        <li className={'chat__sidebar_user'}>
                            <img src={ava} alt={"Avatar"}/>

                            <div className={'chat__user_info'}>
                                <h2 className={'chat__user_name'}>Konstantin Konstantinopolski</h2>
                                <p className={'chat__user_last-message'}>Hey!</p>
                            </div>
                        </li>
                        <li className={'chat__sidebar_user'}>
                            <img src={ava} alt={"Avatar"}/>

                            <div className={'chat__user_info'}>
                                <h2 className={'chat__user_name'}>Azazlo2004</h2>
                                <p className={'chat__user_last-message'}>Hey!</p>
                            </div>
                        </li>
                        <li className={'chat__sidebar_user'}>
                            <img src={ava} alt={"Avatar"}/>

                            <div className={'chat__user_info'}>
                                <h2 className={'chat__user_name'}>Baxit2007</h2>
                                <p className={'chat__user_last-message'}>Hey!</p>
                            </div>
                        </li>
                        <li className={'chat__sidebar_user'}>
                            <img src={ava} alt={"Avatar"}/>

                            <div className={'chat__user_info'}>
                                <h2 className={'chat__user_name'}>MaksimLox2002</h2>
                                <p className={'chat__user_last-message'}>Hey!</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={'chat__dialogs'}>
                    Chat
                </div>
            </div>
        </>
    );
};

export default Chat;