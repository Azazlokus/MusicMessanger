import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function PostItem(props) {
    const[likes, setLikes] = useState(0)
    const[likesCheck, setLikesCheck] = useState(false)
    function addLikes(){
        if(likesCheck === false){
            setLikes(likes+1)
            setLikesCheck(true)
        }
        else{
            setLikes(likes-1)
            setLikesCheck(false)
        }
    }

    return (
        <section className="post__item">
            <h1 className="post__item_title">{props.post.title}</h1>
            <p className="post__item_text">{props.post.text}</p>
            <div className="post__item_btns">
                <div className="post__item_likes">
                    <Icon onClick={addLikes} className='post__likes_img' icon="icon-park-solid:like"  />
                    <h1 className='post__likes_count'>{likes}</h1>
                </div>
                <Icon onClick={() => props.del(props.post)} className='post__item_delete' icon="ic:round-delete-forever" color="red" />
            </div>
        </section>
    );
}

export default PostItem;