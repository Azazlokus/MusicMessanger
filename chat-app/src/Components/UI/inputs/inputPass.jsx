import React, { useState } from 'react';

function MyInputPass() {
    const [pass, setPass] = useState('');
    const [passVoid, setPassVoid] = useState(false);
    const [passError, setPassError] = useState('The password field cannot be empty.')

    function passHandler(e){
        setPass(e.target.value)
        if(e.target.value.length < 6 || e.target.value.length > 12){
            setPassError('Incorrect password')
        }else{
            setPassError('')
        }
    }

    function blurHandler(e){
        switch (e.target.type) {
            case 'password':
                setPassVoid(true)
                break;
        
            default:
                break;
        }
    }

    return ( 
        <div>
            {(passVoid && passError) && <div style={{color: 'red'}}>{passError}</div>} 
            <input onChange={passHandler} value={pass} type="password" onBlur={blurHandler} placeholder="Input password" className="logIn__item_input"/>
        </div>
    );
}

export default MyInputPass;