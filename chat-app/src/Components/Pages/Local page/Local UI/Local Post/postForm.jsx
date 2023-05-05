import React from 'react';

import './localPost.css';

function PostForm({addNewPost, setSearchQuery, searchQuery}) {
    const [createFormVisible, setCreateFormVisible] = React.useState(false)
    const [post, setPost] = React.useState({title: '', text: ''})

    function createNewPost(e){
        e.preventDefault()
        const newPost = {
            title: post.title,
            text: post.text,
            id: Date.now()
        }
        addNewPost(newPost)
        setPost({title: '', text: ''})
        setCreateFormVisible(false)
    }

    function handleForm() {
        if(createFormVisible){
            setCreateFormVisible(false)
        }else{
            setCreateFormVisible(true)
        }
    }



    return (
        <div className={'post__form'}>
            <button onClick={handleForm} className={'post__form_btn'}>create</button>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={'Title search'} className={'post__form_input'}/>


            {createFormVisible && (
                <div className={'post__form_create'}>
                    <h1 style={{textAlign: 'center'}}>Create post</h1>
                    <input
                        value={post.title}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                        className={'post__create_title'}
                    />
                    <textarea
                        value={post.text}
                        onChange={(e) => setPost({...post, text: e.target.value})}
                        maxLength={200}
                        className={'post__create_area'}
                    />

                    <div className={'post__create_btns'}>
                        <button onClick={createNewPost} className={'post__create_btn'}>create</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostForm;