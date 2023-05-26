import React, {FC} from 'react';
import './MyInput.css';

interface myInputProps {
    type: string
    title: string
    placeholder?: string
    value?: string
    onChange?: any
}

const MyInput:FC<myInputProps> = ({title, type, placeholder, value, onChange}) => {
    return (
        <div className={'input__container'}>
            <span className={'input__title'}>{title}</span>
            <input value={value} onChange={onChange} className={'input__myinput'} type={type} placeholder={placeholder}/>
        </div>
    );
};

export default MyInput;