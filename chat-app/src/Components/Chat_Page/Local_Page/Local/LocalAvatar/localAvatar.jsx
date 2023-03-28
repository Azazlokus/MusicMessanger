import React from 'react';
import '../LocalAvatar/localAvatar.css'
import localImage from '../LocalImage/avatar№2.jpg';

function LocalAvatar() {
    return (
        <div className='local__avatar'>
            <img className='local__avatar_img' src={localImage} alt="" />
        </div>
    );
}

export default LocalAvatar;