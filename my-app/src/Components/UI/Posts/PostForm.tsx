import React from 'react';
import './Posts.css';
import {Icon} from "@iconify/react";


const PostForm = () => {
    return (
        <div>
            <div className={'postform__container'}>
                <button className={'postform__create'}>post create</button>

                <input type={'text'} className={'postform__input'}/>

                <div className={'postform__btn'}>
                    <Icon className={'postform__icon'} icon="material-symbols:add-a-photo" color="blue" />
                    <Icon className={'postform__icon'} icon="carbon:music-add" color="blue" />
                    <Icon className={'postform__icon'} icon="fluent:video-add-20-filled" color="blue" />
                </div>
            </div>
        </div>
    );
};

export default PostForm;