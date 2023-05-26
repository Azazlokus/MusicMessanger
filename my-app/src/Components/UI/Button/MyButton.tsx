import React, {FC} from 'react';
import './MyButton.css';
interface buttonProps {
    buttonText: string
    type?: 'submit' |'button' | 'reset' | undefined
    onClick?: any
}
const MyButton:FC<buttonProps> = ({buttonText, onClick, type}) => {
    return (
        <button onClick={onClick} type={type} className={'mybutton'}>
            {buttonText}
        </button>
    );
};

export default MyButton;