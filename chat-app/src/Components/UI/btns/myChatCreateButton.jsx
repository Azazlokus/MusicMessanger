import React from 'react';
import { Icon } from '@iconify/react';

function ChatCreateButton() {
    return (
        <div className='ChatCreate'>
            <Icon className='chat__create_icon' icon="material-symbols:add" />
            <p className="chat__create_title">create chat</p>
        </div>
    );
}

export default ChatCreateButton;
