import React from 'react';
import Header from "../../UI/Header/Header";
import './Profile.css';
import {useAuth} from "../../Provider/useAuth";
import {Navigate} from "react-router-dom";
import {doc, updateDoc,getDocs, getDoc, collection, addDoc} from 'firebase/firestore'
import {IUser} from "../../../Type";
import PostForm from "../../UI/Posts/PostForm";
import PostList from "../../UI/Posts/PostList";
import MusicPlayer from "../../UI/MusicPlayer/MusicPlayer";




const Profile = () => {
    const [postVisiable, setPostVisiable] = React.useState(false)
    const [musicVisiable, setMusicVisiable] = React.useState(false)


    const {user, users, base, setUser} = useAuth()
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


    if (!userProfile) {
        return <Navigate to="/news" replace />;
    }

    const createMusic = () => {
        window.location.href = "http://kittydaw.byethost7.com/";
    }
    function postHandler() {
        if(postVisiable){
           setPostVisiable(false)
        }
        else{
            setPostVisiable(true)

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
                                <button
                                    onClick={() => handleFollow('Привет, я добавил тебя в друзья!')}
                                    className={'btn__to_add'}
                                >
                                    {userId && user?.follow.includes(userId) ? 'Unfollow' : 'Follow'}
                                </button>
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
                    <li onClick={musicHandler} className={'profile__nav_item'}>
                        Music
                    </li>
                </ul>

                {
                    postVisiable && (
                        <div className={'profile__post_container'}>
                            <PostForm/>
                            <PostList/>
                        </div>
                    )
                }
                {

                }
                {
                    musicVisiable && (
                        <div className={'music'}>
                            <div className="music__btn">
                                <button onClick={createMusic} className={'music__btn_create'}>Create</button>
                            </div>
                            <MusicPlayer/>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Profile;