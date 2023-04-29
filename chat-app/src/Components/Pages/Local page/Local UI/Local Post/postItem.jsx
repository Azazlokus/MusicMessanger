import React from 'react';
import './localPost.css';
function PostItem({post}) {
    return (
        <div className={'post__item_container'}>
            <h1 className={'post__item_title'}>{post.title}</h1>
            <p className={'post__item_text'}>{post.text}</p>
        </div>
    );
}

export default PostItem;