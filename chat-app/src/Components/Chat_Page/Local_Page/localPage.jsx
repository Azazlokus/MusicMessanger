import React, { useState } from 'react';
import ChatList from '../ChatList/chatList';
import Header from '../Header/header';
import '../Local_Page/localPage.css'
import LocalHeader from './Local/LocalHeader/localHeader';
import LocalPostForm from './Local/LocalPost/localPostForm';
import PostList from './Local/LocalPost/localPostList';


function LocalPage() {
    const[postFormVisiable, setPostFormVisiable] = useState(false) //This state for PostFormCreate was visiable
    const[posts, setPosts] = useState([

    ])

    function addNewPost(newPost){
        setPosts([...posts, newPost])
    }
    function deletePost(post){
        setPosts(posts.filter(e => post.id !== e.id))
    }


    return (
        <div>
            <Header />
            <section>
                <div className="chat__container">
                    <ChatList />
                    <section className="local__content">
                        <LocalHeader postFormVisiable={postFormVisiable} setPostFormVisiable={setPostFormVisiable} />
                        {
                            postFormVisiable && (
                                <LocalPostForm 
                                setPostFormVisiable={setPostFormVisiable}
                                create={addNewPost}
                                />
                            )
                        }
                        <PostList del={deletePost} posts={posts}/>
                    </section>
                </div>
            </section>
        </div>
    );
}

export default LocalPage;