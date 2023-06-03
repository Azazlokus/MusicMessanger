import React, {FC, KeyboardEvent} from 'react';
import './Posts.css';
import {Icon} from "@iconify/react";
import {useAuth} from "../../Provider/useAuth";
import { addDoc, collection } from "firebase/firestore";


const PostForm:FC = () => {
    const [content, setContent] = React.useState<string>('')
    const {user, base} = useAuth()
    async function addPost(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && user){

            try {
                const docRef = await addDoc(collection(base, "posts"), {
                    author: user,
                    content: content,
                    createdData: Date.now(),
                });

            } catch (e) {

            }
            setContent('')
        }

    }

    return (
        <div>
            <div className={'postform__container'}>


                <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onKeyUp={addPost}
                    maxLength={217}
                    type={'text'}
                    className={'postform__input'}/>

                <div className={'postform__btn'}>
                    <Icon className={'postform__icon'} icon="material-symbols:add-a-photo" color="blue" />
                    <Icon className={'postform__icon'} icon="carbon:music-add" color="blue" />
                    <Icon className={'postform__icon'} icon="fluent:video-add-20-filled" color="blue" />
                </div>
            </div>
        </div>
    );
};

export default PostForm;