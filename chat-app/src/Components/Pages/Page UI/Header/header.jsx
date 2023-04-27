import React from 'react';
import './header.css';
import chat from '../../../../image/chat.png';
import local from '../../../../image/local.png';
import notify from '../../../../image/notif.png';
import other from '../../../../image/other.png';
import settings from '../../../../image/settings.png';

function Header() {
    return (
        <header className={'header'}>
            <div className={'header__container'}>
                <h1 className={'header__title'}>chat</h1>

                <ul className={'header__nav'}>
                    <li className={'header__nav_item'}>
                        <img src={other} alt={'Other'}/>
                    </li>
                    <li className={'header__nav_item'}>
                        <img src={local} alt={'Local'}/>
                    </li>
                    <li className={'header__nav_item'}>
                        <img src={chat} alt={'Chat'}/>
                    </li>
                    <li className={'header__nav_item'}>
                        <img src={notify} alt={'Notify'}/>
                    </li>
                </ul>

                <img src={settings} alt={'Settings'}/>
            </div>
        </header>
    );
}

export default Header;