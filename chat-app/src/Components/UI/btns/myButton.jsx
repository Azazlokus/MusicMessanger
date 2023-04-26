import React from 'react';
import '../../Pages/Login page/login.css'

function MyButton(props) {
    return ( 
        <button className={'MyButton'} type={props.type}>{props.text}</button>
    );
}

export default MyButton;