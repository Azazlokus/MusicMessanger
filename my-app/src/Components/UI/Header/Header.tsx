import React from 'react';
import other from '../../../Img/other.png';
import message from '../../../Img/chat.png';
import notification from '../../../Img/notif.png';
import settings from '../../../Img/settings.png';
import profile from '../../../Img/Profile.png';
import './Header.css';

const Header = () => {
    return (
        <header className={'header'}>
            <div className={'header__container'}>
                <h1 className={'header__logo'}>chat</h1>

                <ul className={'header__nav'}>
                    <li className={'header__nav_item'}>
                        <img className={'header__nav_img'} src={other} alt={'Other'}/>
                    </li>
                    <li className={'header__nav_item'}>
                        <img src={message} alt={'chat'}/>
                    </li>
                    <li className={'header__nav_item'}>
                        <img src={notification} alt={'Notification'}/>
                    </li>
                    <li className={'header__nav_item'}>
                        <img src={settings} alt={'Settings'}/>
                    </li>
                </ul>

                <img className={'header__profile'} src={profile} alt={'Profile'}/>
            </div>
        </header>
    );
};

export default Header;