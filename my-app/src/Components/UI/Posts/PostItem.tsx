import React from 'react';
import './Posts.css';
import userAva from '../../../Img/postLogo.png';
import comments from '../../../Img/coments.png';
import repost from '../../../Img/repost.png';
import {Icon} from "@iconify/react";

const PostItem = () => {
    return (
        <div className={'postitem__container'}>
            <header className={'postitem__header'}>
                <img src={userAva} alt={'User Avatar'} className={'postitem__header_img'}/>
                <div className={'postitem__header_text'}>
                    <h3 className={'postitem__header_username'}>Azazlokus2004</h3>
                    <p className={'postitem__header_dateofcreate'}>3 minutes ago</p>
                </div>
            </header>

            <p className={'postitem__content_text'}></p>

            <footer className={'postitem__footer'}>
                <div className={'postitem__footer_likes'}>
                    <Icon className={'postitem__footer_img'} icon="icon-park-solid:like" color="red"/>
                    <h2 className={'postitem__footer_likevalue'}></h2>
                </div>
                <img className={'postitem__footer_img'} src={comments} alt={'Comments'}/>
                <img className={'postitem__footer_img'} src={repost} alt={'Repost'}/>
            </footer>
        </div>
    );
};

export default PostItem;