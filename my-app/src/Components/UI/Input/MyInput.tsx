import React, {FC} from 'react';
import './MyInput.css';

interface myInputProps {
    type: string
    title: string
    placeholder?: string
}

const MyInput:FC<myInputProps> = ({title, type, placeholder}) => {
    return (
        <div className={'input__container'}>
            <span className={'input__title'}>{title}</span>
            <input className={'input__myinput'} type={type} placeholder={placeholder}/>
        </div>
    );
};

export default MyInput;