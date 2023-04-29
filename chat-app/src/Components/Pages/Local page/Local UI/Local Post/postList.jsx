import React from 'react';
import PostItem from "./postItem";
import './localPost.css';
function PostList({posts}) {
    return (
        <div className={'post__list'}>
            {posts.map(post => (
                <PostItem key={post.id} post={post}/>
            ))}
        </div>
    );
}

export default PostList;