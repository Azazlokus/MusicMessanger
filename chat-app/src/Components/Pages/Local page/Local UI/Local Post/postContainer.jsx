import React from 'react';
import PostForm from "./postForm";
import PostList from "./postList";
import './localPost.css';

function PostContainer() {
    const [posts, setPosts] = React.useState([])
    function addNewPost(newPost){
        setPosts([...posts, newPost])
    }
    return (
        <div className={'post__container'}>
            <PostForm addNewPost={addNewPost}/>
            <PostList posts={posts}/>
        </div>
    );
}

export default PostContainer;