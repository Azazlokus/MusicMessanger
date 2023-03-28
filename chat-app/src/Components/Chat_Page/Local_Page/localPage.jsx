import React from 'react';
import ChatList from '../ChatList/chatList';
import Header from '../Header/header';
import '../Local_Page/localPage.css'
import LocalAvatar from './Local/LocalAvatar/localAvatar';
import LocalBackground from './Local/LocalBackground/localBackground';
import LocalNav from './Local/LocalNav/localNav';
import LocalPostCreate from './Local/LocalPostCreate/localPostCreate';
import LocalTitleBar from './Local/LocalTitleBar/localTitleBar';

function LocalPage(props) {
    return (
        <div>
            <Header/>
            <section>
                <div className="chat__container">
                    <ChatList/>

                    <section className="local__content">
                        <LocalBackground/>
                        <LocalAvatar/>
                        <LocalTitleBar/>
                        <LocalNav/>
                        <LocalPostCreate/>
                    </section>
                </div>
            </section>
        </div>
    );
}

export default LocalPage;