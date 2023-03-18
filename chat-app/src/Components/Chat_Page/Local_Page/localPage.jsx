import React from 'react';
import ChatList from '../ChatList/chatList';
import Header from '../Header/header';
import '../Local_Page/localPage.css'

function LocalPage() {
    return (
        <div>
            <Header/>
            <section>
                <div className="chat__container">
                    <ChatList/>

                    <section className="local__content">
                        dqwdqd
                    </section>
                </div>
            </section>
        </div>
    );
}

export default LocalPage;