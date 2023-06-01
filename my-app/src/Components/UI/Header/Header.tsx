import React from 'react';
import other from '../../../Img/other.png';
import message from '../../../Img/chat.png';
import notification from '../../../Img/notif.png';
import settings from '../../../Img/settings.png';
import profile from '../../../Img/Profile.png';
import './Header.css';
import {Link} from "react-router-dom";
import {signOut} from "firebase/auth";
import {useAuth} from "../../Provider/useAuth";


const Header = () => {
    const {user, gAuth} = useAuth()
    return (
        <header className={'header'}>
            <div className={'header__container'}>
                <Link className={'link__header'} to={'/news'}>
                    <h1 className={'header__logo'}>chat</h1>
                </Link>

                <ul className={'header__nav'}>
                    <li className={'header__nav_item'}>
                        <img className={'header__nav_img'} src={other} alt={'Other'}/>
                    </li>
                    <li className={'header__nav_item'}>
                        <Link to={'/chat'}>
                            <img src={message} alt={'chat'}/>
                        </Link>
                    </li>
                    <li className={'header__nav_item'}>
                        <img src={notification} alt={'Notification'}/>
                    </li>
                    <li className={'header__nav_item'}>
                        <img src={settings} alt={'Settings'}/>
                    </li>
                </ul>

                <Link className={'link__header'} to={`/profile`}>
                    <img className={'header__profile'} src={profile} alt={'Profile'}/>
                    {user && (
                        <button onClick={() => signOut(gAuth)}>Exit</button>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;