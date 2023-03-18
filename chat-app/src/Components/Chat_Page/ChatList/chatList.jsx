import React from 'react';
import '../ChatList/chatList.css'
import ChatCreateButton from '../../UI/btns/myChatCreateButton';

function ChatList() {
    return (
        <aside className="chat__content">
            <div className="chat__content_container">
                <ChatCreateButton />
            </div>
        </aside>
    );
}

export default ChatList;