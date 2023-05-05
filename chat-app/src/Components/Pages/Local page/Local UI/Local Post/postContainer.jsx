import React from 'react';
import PostForm from "./postForm";
import PostList from "./postList";
import './localPost.css';

function PostContainer() {
    const [posts, setPosts] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState('')

    const searchPosts = React.useMemo(() => {
        return posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, posts])
    function addNewPost(newPost){
        setPosts([...posts, newPost])
    }
    
    function removePosts(post) {
        setPosts(posts.filter(e => e.id !== post.id))
    }
    
    return (
        <div className={'post__container'}>
            <PostForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} addNewPost={addNewPost}/>
            <PostList removePosts={removePosts} posts={searchPosts}/>
        </div>
    );
}

export default PostContainer;
