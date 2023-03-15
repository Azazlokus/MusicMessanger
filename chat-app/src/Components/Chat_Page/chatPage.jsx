import React from 'react';
import './chatPage.css';

function ChatPage() {
    return (
        <div>
            <header>
                <div className="header__container">
                    <img src='/img/Chat_logo.png' alt="" className="header__logo" />
                    <div className='header_avatar'>
                        <img src="/img/Group455429.png" alt="" />
                    </div>
                </div>
            </header>

            <section>
                <div className="chat__container">
                    <aside className="chat">

                    </aside>

                    <section className="chat__content">
                        
                    </section>
                </div>
            </section>
        </div>
    );
}

export default ChatPage;