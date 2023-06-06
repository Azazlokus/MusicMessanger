import React, {FC} from 'react';
import './Posts.css';
import userAva from '../../../Img/postLogo.png';
import {Icon} from "@iconify/react";
interface PostItemProps {
    post: any
}
const PostItem:FC<PostItemProps> = ({post}) => {
    const [likeValue, setLikeValue] = React.useState(0)
    const [isLike, setIsLike] = React.useState(false)
    function like() {
        if(isLike){
            setLikeValue(likeValue -1)
            setIsLike(false)
        } else {
            setLikeValue(likeValue + 1)
            setIsLike(true)
        }
    }
    return (
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
                    <Icon onClick={like} className={'postitem__footer_img'} icon="icon-park-solid:like" color="red"/>
                    <h2 className={'postitem__footer_likevalue'}>{likeValue}</h2>
                </div>
            </footer>
        </div>
    );
};

export default PostItem;