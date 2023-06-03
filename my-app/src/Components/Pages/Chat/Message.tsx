import React, {FC, MouseEvent} from 'react';
import {addDoc, collection, onSnapshot} from 'firebase/firestore'
import './Chat.css';
import {useAuth} from "../../Provider/useAuth";
import {IMessage} from "../../../Type";
import NoneChatBg from '../../../Img/NoneChatBg.png';

const Message:FC = () => {
    const {base, user} = useAuth()
    const [messages, setMessages] = React.useState<IMessage[]>([])
    const [message, setMessage] = React.useState('')
    const chatId = window.location.pathname.split('/id:').pop();

    React.useEffect(() => {
        const unsub = onSnapshot(collection(base, 'massages'), doc => {
            const arr:IMessage[] = []
            doc.forEach((d: any) => {
                arr.push(d.data())
            })

            setMessages(arr.sort((a,b) => parseInt(a.createdAt) - parseInt(b.createdAt)))
        })

        return () => {
            unsub()
        }
    }, [])

    const addMassage = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            if (message !== ''){
                const docRef = await addDoc(collection(base, 'massages'), {
                    user,
                    message,
                    createdAt: Date.now()
                })
            }
        } catch (e: any) {

        }
        setMessage('');

    }
    
    return (
        <>
            {chatId === '/chat' ?
                (<div className={'none__chat_container'}>
                        <img className={'none__chat_bg'} src={NoneChatBg} alt={'None Chat Background'}/>
                </div>
                )
            :   (
                    <div className="chat-page">
                        <div className="chat-header">
                            <div className="chat-header-content">
                                <img className={'chat-header-avatar'} src={user?.avatar} alt={'User avatar'}/>
                                <div className={'chat-header-info'}>
                                    <h1 className={'chat-header-name'}>{user?.name}</h1>
                                    <p className={'chat-header-online'}>Online</p>
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
                                <div key={msg.createdAt} style={msg.user._id === user?._id ? {alignItems: 'flex-end'} : {}} className="message sender-message">
                                    <div className={'msg__item'}>
                                        <div className={'msg__item_img'}>
                                            <img src={msg.user.avatar} alt={'User Avatar'} className={'msg__item_avatar'}/>
                                        </div>

                                        <h1 className={'msg__item_name'}>{msg.user.name}</h1>
                                    </div>

                                    <div className="message-text">{msg.message}</div>
                                </div>
                            ))}


                        </div>
                        <div className="chat-footer">
                            <form className="message-form">
                                <input
                                    maxLength={40}
                                    onChange={e => setMessage(e.target.value)}
                                    value={message}
                                    type="text"
                                    className="message-input"
                                    placeholder="Введите сообщение"/>
                                <button
                                    onClick={addMassage}
                                    className="send-button">Отправить
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Message;