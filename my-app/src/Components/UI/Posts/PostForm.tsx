import React from 'react';
import './Posts.css';
import MyButton from "../Button/MyButton";

const PostForm = () => {
    return (
        <div>
            <div className={'postform__container'}>
                <button className={'postform__create'}>post create</button>

                <input type={'text'} className={'postform__input'}/>

                <div className={'postform__btn'}>

                </div>
            </div>
        </div>
    );
};

export default PostForm;