import React from 'react';

function Title(props) {
    return (
        <div className='title'>
            <img src="/img/LogIn__logo.png" alt="Logo" className="logIn__logo" />

            <div className="logIn__text">
                <h1 className="logIn__title">{props.title}</h1>
                <p className="logIn__title_text">{props.text}</p>
            </div>
        </div>
    );
}

export default Title;