import React, { useRef, useState } from 'react';

function MyButton(props) {
    return ( 
        <button className={props.className} type={props.type}>{props.text}</button>
    );
}

export default MyButton;