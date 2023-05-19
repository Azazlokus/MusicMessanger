import React from 'react';
import './Posts.css';
import PostItem from "./PostItem";

const PostList = () => {
    return (
        <div className={'postlist__container'}>
            <PostItem/>
        </div>
    );
};

export default PostList;