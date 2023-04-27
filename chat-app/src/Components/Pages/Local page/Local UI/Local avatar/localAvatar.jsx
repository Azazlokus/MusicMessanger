import React from 'react';
import './localAvatar.css';
import ava from '..//../../../../image/avatar.png'

function LocalAvatar() {
    return (
        <div className={'local__avatar'}>
            <img src={ava} alt={'Avatar'} className={'local__avatar_image'}/>
        </div>
    );
}

export default LocalAvatar;