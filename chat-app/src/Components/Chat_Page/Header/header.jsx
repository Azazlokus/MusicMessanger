import React from 'react';
import '../Header/header.css'

function Header() {
    return (
        <header>
            <div className="header__container">
                <img src='/img/Chat_logo.png' alt="" className="header__logo" />
                <div className='header_avatar'>
                    <img src="/img/Group455429.png" alt="" />
                </div>
            </div>
        </header>
    );
}

export default Header;