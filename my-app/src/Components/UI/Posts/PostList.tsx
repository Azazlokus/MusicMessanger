import React, {FC} from 'react';
import './Posts.css';

import {IPost} from "../../../Type";
import userAva from "../../../Img/postLogo.png";
import {Icon} from "@iconify/react";
import comments from "../../../Img/coments.png";
import repost from "../../../Img/repost.png";
import {useAuth} from "../../Provider/useAuth";
import {collection, onSnapshot} from "firebase/firestore";
import PostItem from "./PostItem";


const PostList:FC = () => {
    const {base} = useAuth()
    const [posts, setPosts]  = React.useState<IPost[]>([])


    React.useEffect(() => {
        const unsub = onSnapshot(collection(base, 'posts', ), doc => {
            const arr:IPost[] = []
            doc.forEach((d:any) => {
                arr.push(d.data())
            })
            arr.map(ar => {

            })
            setPosts(arr.sort((a,b) => parseInt(a.createdData) - parseInt(b.createdData)))
        })

        return () => {
            unsub()
        }
    }, [])
    return (
        <div className={'postlist__container'}>
            <div className="postlist-reverse">
                {posts.map((post, index) => (
                    <PostItem post={post}/>
                ))}
            </div>
        </div>
    );
};

export default PostList;