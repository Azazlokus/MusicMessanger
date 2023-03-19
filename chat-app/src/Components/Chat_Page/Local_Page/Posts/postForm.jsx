import React from 'react';
import '../Posts/post.css'

function PostForm() {
    function sizeTextArea(e) {
        if (this.style.height < 300) {
            this.style.height += 20;
        }
    }
    return (
        <form className='local__post_form' action="">
            <textarea onKeyUp={sizeTextArea} maxLength={300} type={'text'} className='local__post_text' placeholder='Write the text of the post' />
            <button className='local__post_btn' type={'submit'}>Create post</button>
        </form>
    );
}

export default PostForm;