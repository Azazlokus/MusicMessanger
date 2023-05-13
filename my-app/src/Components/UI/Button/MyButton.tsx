import React, {FC} from 'react';
import './MyButton.css';
interface buttonProps {
    buttonText: string
    type?: 'submit' |'button' | 'reset' | undefined
}
const MyButton:FC<buttonProps> = ({buttonText, type}) => {
    return (
        <button type={type} className={'mybutton'}>
            {buttonText}
        </button>
    );
};

export default MyButton;