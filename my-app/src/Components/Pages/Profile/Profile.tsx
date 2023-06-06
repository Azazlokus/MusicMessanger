import React, { useState, useEffect } from 'react';
import Header from "../../UI/Header/Header";
import './Profile.css';
import { useAuth } from "../../Provider/useAuth";
import { Navigate } from "react-router-dom";
import {doc, updateDoc, getDoc, collection, addDoc, getDocs} from 'firebase/firestore';
import { IUser } from "../../../Type";
import PostForm from "../../UI/Posts/PostForm";
import PostList from "../../UI/Posts/PostList";
import MusicPlayer from "../../UI/MusicPlayer/MusicPlayer";

const Profile = () => {
    const [postVisible, setPostVisible] = useState(false);
    const [musicVisible, setMusicVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [newAvatar, setNewAvatar] = useState('');

    const { user, users, base, setUser } = useAuth();
    const userId = window.location.pathname.split('/id:').pop();
    const currentUser = users.find((usr) => usr._id === userId);
    const userProfile = currentUser && currentUser._id !== user?._id ? currentUser : user;


    const handleFollow = async (message: any) => {
        if (user !== null && userId) {
            // Проверяем, следит ли пользователь уже за выбранным пользователем
            const isFollowing = user.follow.includes(userId);

            if (isFollowing) {
                // Если пользователь уже следит, удаляем его из массива follow
                const updatedFollow = user.follow.filter((id) => id !== userId);
                const userRef = doc(base, 'users', user._id);
                await updateDoc(userRef, {
                    follow: updatedFollow,
                });
            } else {
                // Если пользователь не следит, добавляем его в массив follow
                const userRef = doc(base, 'users', user._id);
                await updateDoc(userRef, {
                    follow: [...user.follow, userId],
                });

                // Проверяем, существует ли уже чат с выбранным пользователем
                const chatRef = collection(base, 'chats');
                const chatSnapshot = await getDocs(chatRef);
                let existingChatId = '';

                for (const chatDoc of chatSnapshot.docs) {
                    const chatData = chatDoc.data();
                    if (chatData && chatData.chatId.includes(user._id) && chatData.chatId.includes(userId)) {
                        existingChatId = chatDoc.id;
                        break;
                    }
                }

                if (existingChatId !== '') {
                    // Если чат уже существует, добавляем новое сообщение в существующий чат
                    const messagesRef = doc(base, 'chats', existingChatId);
                    const messagesSnapshot = await getDoc(messagesRef);
                    const messagesData = messagesSnapshot.data();

                    if (!messagesData || !messagesData.messages) {
                        await updateDoc(messagesRef, {
                            messages: [{ message, user: { _id: user._id, name: user.name, avatar: user.avatar } }],
                        });
                    } else {
                        await updateDoc(messagesRef, {
                            messages: [
                                ...messagesData.messages,
                                { message, user: { _id: user._id, name: user.name, avatar: user.avatar } },
                            ],
                        });
                    }
                } else {
                    // Если чат не существует, создаем новую коллекцию чата
                    const chatCollectionRef = collection(base, 'chats');
                    const newChatDoc = await addDoc(chatCollectionRef, {
                        chatId: [user._id, userId],
                        messages: [{ message, user: { _id: user._id, name: user.name, avatar: user.avatar } }],
                    });
                    console.log('Создана новая коллекция чата с ID:', newChatDoc.id);
                }
            }
        }
    };

    React.useEffect(() => {
        const updateUser = async () => {
            if (user) {
                const userRef = doc(base, 'users', user._id);
                const userSnapshot = await getDoc(userRef);
                const fetchedUser = userSnapshot.data() as IUser;
                if (fetchedUser) {
                    setUser(fetchedUser);
                }
            }
        };

        updateUser();
    }, []);

    const handleEdit = () => {
        if (editMode) {
            // Сохранить изменения в базе данных
            if (user && newName && newAvatar) {
                const userRef = doc(base, 'users', user._id);
                const updatedUser = {
                    ...user,
                    name: newName,
                    avatar: newAvatar,
                };
                updateDoc(userRef, updatedUser)
                    .then(() => {
                        setUser(updatedUser);
                        setEditMode(false);
                    })
                    .catch((error) => {
                        console.error('Error updating user:', error);
                    });
            } else {
                setEditMode(false);
            }
        } else {
            // Включить режим редактирования
            setNewName(user?.name || '');
            setNewAvatar(user?.avatar || '');
            setEditMode(true);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAvatar(event.target.value);
    };

    if (!userProfile) {
        return <Navigate to="/news" replace />;
    }

    const createMusic = () => {
        window.location.href = "http://kittydaw.byethost7.com/";
    };

    const postHandler = () => {
        if (postVisible) {
            setPostVisible(false);
        } else {
            setPostVisible(true);
            setMusicVisible(false);
        }
    };

    const musicHandler = () => {
        if (musicVisible) {
            setMusicVisible(false);
        } else {
            setMusicVisible(true);
            setPostVisible(false);
        }
    };
    return (
        <div className={'profile__container'}>
            <Header />
            <div className={'profile__content'}>
                <div className={'profile__theme'}></div>

                <div className={'profile__user'}>
                    <div className={'profile__user_img'}>
                        {editMode ? (
                            <input
                                type="text"
                                value={newAvatar}
                                onChange={handleAvatarChange}
                                placeholder="Enter your avatar URL"
                                className={'profile__user_avatar'}
                            />
                        ) : (
                            <img
                                src={userProfile.avatar}
                                alt={'Avatar'}
                                className={'profile__user_avatar'}
                            />
                        )}
                    </div>
                    <div className={'profile__user_info'}>
                        {editMode ? (
                            <React.Fragment>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={handleNameChange}
                                    placeholder="Enter your name"
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <h1 className={'profile__user_name'}>{userProfile.name}</h1>
                            </React.Fragment>
                        )}

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
                            <button
                                onClick={() => handleFollow('Привет, я добавил тебя в друзья!')}
                                className={'btn__to_add'}
                            >
                                {userId && user?.follow.includes(userId) ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    ) : (
                        <div className={'edit__btn'}>
                            {editMode ? (
                                <React.Fragment>
                                    <button
                                        className={'btn__to_edit'}
                                        onClick={handleEdit}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className={'btn__to_cancel'}
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel
                                    </button>
                                </React.Fragment>
                            ) : (
                                <button
                                    className={'btn__to_edit'}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <ul className={'profile__nav'}>
                    <li onClick={postHandler} className={'profile__nav_item'}>
                        Post
                    </li>
                    <li onClick={musicHandler} className={'profile__nav_item'}>
                        Music
                    </li>
                </ul>

                {postVisible && (
                    <div className={'profile__post_container'}>
                        <PostForm />
                        <PostList />
                    </div>
                )}

                {musicVisible && (
                    <div className={'music'}>
                        <div className="music__btn">
                            <button onClick={createMusic} className={'music__btn_create'}>Create</button>
                        </div>
                        <MusicPlayer />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;