import React from 'react';
import './localPost.css';
import repost from '../../../../../image/repost.png';
import comments from  '../../../../../image/coments.png';
import { Icon } from '@iconify/react';

function PostItem({post, removePosts}) {
    const [like, setLikes] = React.useState(0);
    const [myLikes, setMyLikes] = React.useState(false);

    function handleLike() {
        if(!myLikes){
            setLikes(like + 1)
            setMyLikes(true)
        }else {
            setLikes(like - 1)
            setMyLikes( false)
        }
    }


    return (
        <div className={'post__item'}>
            <Icon onClick={() => removePosts(post)} className={'delete__post'} icon="material-symbols:delete-forever" color="red" />
            <div className={'post__item_container'}>
                <h1 className={'post__item_title'}>{post.title}</h1>
                <p className={'post__item_text'}>{post.text}</p>
            </div>
            <div className={'post__item_btns'}>
                <div className={'post__item_likes'}>
                    <Icon onClick={handleLike} className={'post__item_like'} icon="wpf:like" />
                    <h2>{like}</h2>
                </div>
                <img src={comments} alt={'Comments'} className={'post__item_comments'}/>
                <img src={repost} alt={'Repost'} className={'post__item_repost'}/>
            </div>
        </div>
    );
}

export default PostItem;