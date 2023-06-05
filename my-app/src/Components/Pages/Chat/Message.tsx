import React, { FC, MouseEvent } from 'react';
import { addDoc, collection, doc, getDoc, onSnapshot, getDocs, updateDoc } from 'firebase/firestore';
import './Chat.css';
import { useAuth } from '../../Provider/useAuth';
import { IMessage } from '../../../Type';
import NoneChatBg from '../../../Img/NoneChatBg.png';

const Message: FC = () => {
    const { base, user } = useAuth();
    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const [message, setMessage] = React.useState('');
    const userId = window.location.pathname.split('/id:').pop();

    React.useEffect(() => {
        const chatRef = collection(base, 'chats');
        const unsubscribe = onSnapshot(chatRef, async (querySnapshot) => {
            const arr: IMessage[] = [];

            for (const chatDoc of querySnapshot.docs) {
                const chatData = chatDoc.data();
                if (chatData && chatData.chatId.includes(userId)) {
                    const messagesRef = doc(base, 'chats', chatDoc.id);
                    const messagesSnapshot = await getDoc(messagesRef);
                    const messagesData = messagesSnapshot.data();

                    if (messagesData && messagesData.messages) {
                        arr.push(...messagesData.messages);
                    }
                }
            }

            setMessages(arr.sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)));
        });

        return () => {
            unsubscribe();
        };
    }, [base, userId]);

    const addMessage = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            console.log(message);
            const chatRef = collection(base, 'chats');
            const chatSnapshot = await getDocs(chatRef);

            for (const chatDoc of chatSnapshot.docs) {
                const chatData = chatDoc.data();
                if (chatData && chatData.chatId.includes(userId)) {
                    console.log('Есть такой чат');
                    const chatId = chatDoc.id;
                    const messagesRef = doc(base, 'chats', chatId);
                    const messagesSnapshot = await getDoc(messagesRef);
                    const messagesData = messagesSnapshot.data();

                    if (!messagesData || !messagesData.messages) {
                        await updateDoc(messagesRef, {
                            messages: [{ message, user: user ? { _id: user._id, name: user.name, avatar: user.avatar } : null }],
                        });
                    } else {
                        await updateDoc(messagesRef, {
                            messages: [
                                ...messagesData.messages,
                                { message, user: user ? { _id: user._id, name: user.name, avatar: user.avatar } : null },
                            ],
                        });
                    }
                }
            }
        } catch (error: any) {
            // Обработка ошибки при добавлении сообщения
        }
        setMessage('');
    };

    return (
        <>
            {userId === '/chat' ? (
                <div className="none__chat_container">
                    <img className="none__chat_bg" src={NoneChatBg} alt="None Chat Background" />
                </div>
            ) : (
                <div className="chat-page">
                    <div className="chat-header">
                        <div className="chat-header-content">
                            <img className="chat-header-avatar" src={user?.avatar} alt="User avatar" />
                            <div className="chat-header-info">
                                <h1 className="chat-header-name">{user?.name}</h1>
                                <p className="chat-header-online">Online</p>
                            </div>
                        </div>

                        <div className="chat-header-settings">
                            <span className="chat-settings-menu"></span>
                            <span className="chat-settings-menu"></span>
                            <span className="chat-settings-menu"></span>
                        </div>
                    </div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div
                                key={msg.createdAt}
                                style={msg.user?._id === user?._id ? { alignItems: 'flex-end' } : {}}
                                className="message sender-message"
                            >
                                <div className="msg__item">
                                    <div className="msg__item_img">
                                        <img src={msg.user?.avatar} alt="User Avatar" className="msg__item_avatar" />
                                    </div>

                                    <h1 className="msg__item_name">{msg.user?.name}</h1>
                                </div>

                                <div className="message-text">{msg.message}</div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <form className="message-form">
                            <input
                                maxLength={40}
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                type="text"
                                className="message-input"
                                placeholder="Введите сообщение"
                            />
                            <button onClick={addMessage} className="send-button">
                                Отправить
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;
