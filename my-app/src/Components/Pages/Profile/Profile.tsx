import React from 'react';
import Header from "../../UI/Header/Header";
import './Profile.css';
import {useAuth} from "../../Provider/useAuth";


const Profile = () => {
    const [postVisiable, setPostVisiable] = React.useState(false)
    const [musicVisiable, setMusicVisiable] = React.useState(false)
    const [photoVisiable, setPhotoVisiable] = React.useState(false)

    const {user} = useAuth()
    function postHandler() {
        if(postVisiable){
           setPostVisiable(false)
        }
        else{
            setPostVisiable(true)
            setPhotoVisiable(false)
            setMusicVisiable(false)
        }
    }

    function photoHandler() {
        if(photoVisiable){
            setPhotoVisiable(false)
        }
        else{
            setPhotoVisiable(true)
            setPostVisiable(false)
            setMusicVisiable(false)
        }
    }

    function musicHandler() {
        if(musicVisiable){
            setMusicVisiable(false)
        }
        else{
            setMusicVisiable(true)
            setPostVisiable(false)
            setPhotoVisiable(false)
        }
    }
    return (
        <div className={'profile__container'}>
            <Header/>
            <div className={'profile__content'}>
                <div className={'profile__theme'}></div>

                <div className={'profile__user'}>
                    <div className={'profile__user_img'}>
                        <img src={user?.avatar} alt={'Avatar'} className={'profile__user_avatar'}/>
                    </div>
                    <div className={'profile__user_info'}>
                        <h1 className={'profile__user_name'}>{user?.name}</h1>

                        <div className={'profile__user_friends'}>
                            <div className={'profile__user_follow follow'}>
                                <h2 className={'profile__follow_title'}>following</h2>
                                <p className={'profile__follow_count'}>300</p>
                            </div>

                            <div className={'profile__user_followers followers'}>
                                <h2 className={'profile__followers_title'}>followers</h2>
                                <p className={'profile__followers_count'}>30000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className={'profile__nav'}>
                    <li onClick={postHandler} className={'profile__nav_item'}>
                        Post
                    </li>
                    <li onClick={photoHandler} className={'profile__nav_item'}>
                        Photo
                    </li>
                    <li onClick={musicHandler} className={'profile__nav_item'}>
                        Music
                    </li>
                </ul>

                {
                    postVisiable && (
                        <div className={'profile__post_container'}>
                            {/*<PostForm/>*/}
                            {/*<PostList/>*/}
                        </div>
                    )
                }
                {
                    photoVisiable && (
                        <div>
                            Photo
                        </div>
                    )
                }
                {
                    musicVisiable && (
                        <div>
                            Music
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Profile;