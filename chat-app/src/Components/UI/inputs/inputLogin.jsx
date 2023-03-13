import React, { useState } from 'react';

function MyInputLogin() {
    const [login, setLogin] = useState('');
    const [loginVoid, setLoginVoid] = useState(false);
    const [loginError, setLoginError] = useState('The email field cannot be empty.')

    function emailHandler(e) {
        setLogin(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())) {
            setLoginError("Incorrect email")
        } else {
            setLoginError("")
        }
    }

    const blurHandler = (e) =>{
        switch (e.target.type) {
            case 'email':
                setLoginVoid(true)
                break;
        
            default:
                break;
        }
    }

    return (
        <div>
            {(loginVoid && loginError) && <div style={{color: 'red'}}>{loginError}</div>} 
            <input onChange={emailHandler} value={login} type="email" onBlur={blurHandler} placeholder="Input email" className="logIn__item_input"/>
        </div>
    );
}

export default MyInputLogin;