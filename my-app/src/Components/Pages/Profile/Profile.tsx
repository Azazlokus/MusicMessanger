import React from 'react';
import Header from "../../UI/Header/Header";
import './Profile.css';
import {useAuth} from "../../Provider/useAuth";
import {Navigate} from "react-router-dom";
import {doc, updateDoc, getDoc} from 'firebase/firestore'
import {IUser} from "../../../Type";



const Profile = () => {
    const [postVisiable, setPostVisiable] = React.useState(false)
    const [musicVisiable, setMusicVisiable] = React.useState(false)
    const [photoVisiable, setPhotoVisiable] = React.useState(false)

    const {user, users, base, setUser} = useAuth()
    const userId = window.location.pathname.split('/id:').pop();
    const currentUser = users.find((usr) => usr._id === userId);
    const userProfile = currentUser && currentUser._id !== user?._id ? currentUser : user;

    const handleFollow = async () => {
        if (user !== null) {
            // Обновление массива follow
            const userRef = doc(base, 'users', user._id);
            await updateDoc(userRef, {
                follow: [...user.follow, userId],
            });

            // Обновление данных пользователя
            const updatedUserSnapshot = await getDoc(userRef);
            const updatedUser = updatedUserSnapshot.data() as IUser; // Преобразование типа данных

            if (updatedUser) {
                setUser(updatedUser);
            }
        }
    };

    if (!userProfile) {
        return <Navigate to="/news" replace />;
    }

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

                {user?._id !== userId ? (
                    <div className={'profile__user'}>
                        <div className={'profile__user_img'}>
                            <img src={userProfile.avatar} alt={'Avatar'} className={'profile__user_avatar'} />
                        </div>
                        <div className={'profile__user_info'}>
                            <h1 className={'profile__user_name'}>{userProfile.name}</h1>

                            <div className={'profile__user_friends'}>
                                <div className={'profile__user_follow follow'}>
                                    <h2 className={'profile__follow_title'}>following</h2>
                                    <p className={'profile__follow_count'}>3000</p>
                                </div>

                                <div className={'profile__user_followers followers'}>
                                    <h2 className={'profile__followers_title'}>followers</h2>
                                    <p className={'profile__followers_count'}>{userProfile.follow.length}</p>
                                </div>
                            </div>
                        </div>
                        {userId !== '/profile' ? (
                            <div className={'add__btn'}>
                                <button onClick={handleFollow} className={'btn__to_add'}>Follow</button>
                            </div>
                        ): (
                            <div className={'edit__btn'}>
                                <button className={'btn__to_edit'}>Edit</button>
                            </div>
                        )}
                    </div>
                ): (
                    <Navigate to={'/profile'}/>
                )}

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