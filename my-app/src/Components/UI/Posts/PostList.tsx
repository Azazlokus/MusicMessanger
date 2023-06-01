import React, {FC} from 'react';
import './Posts.css';

import {IPost} from "../../../Type";
import userAva from "../../../Img/postLogo.png";
import {Icon} from "@iconify/react";
import comments from "../../../Img/coments.png";
import repost from "../../../Img/repost.png";
import {useAuth} from "../../Provider/useAuth";
import {collection, onSnapshot} from "firebase/firestore";


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
            {posts.map((post, index) => (
                <div key={post.createdData} className={'postitem__container'}>
                    <header className={'postitem__header'}>
                        <img src={post.author.avatar} alt={'User Avatar'} className={'postitem__header_img'}/>
                        <div className={'postitem__header_text'}>
                            <h3 className={'postitem__header_username'}>{post.author.name}</h3>
                            <p className={'postitem__header_dateofcreate'}>{post.createdData}</p>
                        </div>
                    </header>

                    <p className={'postitem__content_text'}>
                        {post.content}
                    </p>

                    <footer className={'postitem__footer'}>
                        <div className={'postitem__footer_likes'}>
                            <Icon className={'postitem__footer_img'} icon="icon-park-solid:like" color="red"/>
                            <h2 className={'postitem__footer_likevalue'}>0</h2>
                        </div>
                        <img className={'postitem__footer_img'} src={comments} alt={'Comments'}/>
                        <img className={'postitem__footer_img'} src={repost} alt={'Repost'}/>
                    </footer>
                </div>
            ))}
        </div>
    );
};

export default PostList;