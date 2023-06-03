import React, {FC} from 'react';
import Header from "../../UI/Header/Header";
import ava from '../../../Img/Avatar.png'
import './Chat.css';
import Message from "./Message";
import {useAuth} from "../../Provider/useAuth";
import {doc, getDoc} from "firebase/firestore";
import {IUser} from "../../../Type";
import {Link} from "react-router-dom";

const Chat:FC = () => {
    const {users, base, user} = useAuth()
    const [chatUsers, setChatUsers] = React.useState<string[]>([])
    React.useEffect(() => {
        const chatArray = async () => {
            if (user) {
                const userRef = doc(base, 'users', user._id);
                const userSnapshot = await getDoc(userRef);
                const fetchedUser = userSnapshot.data() as IUser;
                if (fetchedUser) {
                    setChatUsers((prevFollowArr) => [...prevFollowArr, ...fetchedUser.follow]);
                }
            }
        };

        chatArray();
    }, []);
    return (
        <>
            <Header/>
            <div className={'chat__content'}>
                <div className={'chat__sidebar'}>
                    <input className={'chat__sidebar_input'}/>
                    <ul className={'chat__sidebar_users'}>
                        {user &&
                            chatUsers.length > 0 &&
                            chatUsers.map((followedUserId) => {
                                const followedUser = users.find((usr) => usr._id === followedUserId);
                                if (followedUser) {
                                    return (
                                        <Link key={followedUser._id} className={'link_chatId'} to={`/chat/id:${followedUser._id}`}>
                                            <li  className={'chat__sidebar_user'}>
                                                <img className={'chat__sidebar_avatar'} src={followedUser.avatar} alt={"Avatar"}/>

                                                <div className={'chat__user_info'}>
                                                    <h2 className={'chat__user_name'}>{followedUser.name}</h2>
                                                    <p className={'chat__user_last-message'}>Hey!</p>
                                                </div>
                                            </li>
                                        </Link>
                                    );
                                }
                                return null;
                            })}

                    </ul>
                </div>

                <div className={'chat__dialogs'}>
                    <Message/>
                </div>
            </div>
        </>
    );
};

export default Chat;