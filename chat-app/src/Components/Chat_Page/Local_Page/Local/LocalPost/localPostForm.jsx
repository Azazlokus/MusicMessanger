import React, { useState } from 'react';
import '../LocalPost/localPost.css'

function LocalPostForm({create, setPostFormVisiable}) {
    const [post, setPost] = useState({title: '', text: ''});
    const [titleHolder, setTitleHolder] = useState('Title'); // This state for placeholder title
    const [textHolder, setTextHolder] = useState('Text') // This state for placeholder text

    function createPost(e){
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        if((post.title !== '' && post.text !== '') && (post.title !== ' ' && post.text !== ' ')){ 
            create(newPost)
            setPostFormVisiable(false) // Form is not visiable if post create
        }
        else if(post.title === '' || post.title === ' '){
            setTitleHolder('*You cannot create a post until you enter a title.')
        }
        else if(post.text === '' || post.text === ' '){
            setTextHolder('*You cannot create a post until you enter a text.')
        }

    }
    return (
        <form className='local__post_form'>
            <input 
            placeholder={titleHolder} 
            value={post.title} 
            onChange={e => setPost({...post, title: e.target.value})} 
            type="text" 
            className="post__form_title" 
            />

            <textarea 
            placeholder={textHolder} 
            value={post.text} 
            onChange={e => setPost({...post, text: e.target.value})} 
            rows="13" cols="50" 
            type="text" 
            className="post__form_text" >
            </textarea>

            <div className="post__form_btns">
                <button onClick={createPost} className="post__form_create">Create Post</button>
            </div>
        </form>
    );
}

export default LocalPostForm;