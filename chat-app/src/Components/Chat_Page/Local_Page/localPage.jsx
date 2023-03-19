import React from 'react';
import ChatList from '../ChatList/chatList';
import Header from '../Header/header';
import '../Local_Page/localPage.css'
import TitleName from '../TitleName/titleName';
import PostForm from './Posts/postForm';

function LocalPage(props) {
    return (
        <div>
            <Header/>
            <section>
                <div className="chat__container">
                    <ChatList/>

                    <section className="local__content">
                        <TitleName name={'Marina Joe'}/>

                        <div className="local__img" ></div>

                        <div className="local__post">
                            <PostForm/>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}

export default LocalPage;