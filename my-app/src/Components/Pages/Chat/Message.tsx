import React from 'react';
import './Chat.css';

const Message = () => {
    return (
        <div className="chat-page">
            <div className="chat-header">

            </div>
            <div className="chat-body">
                <div className="message sender-message">
                    <div className={'msg__item'}>
                        <div className={'msg__item_img'}>
                            <img src={''} alt={'User Avatar'} className={'msg__item_avatar'}/>
                        </div>

                        <h1 className={'msg__item_name'}>User</h1>
                    </div>

                    <div className="message-text">massage</div>
                </div>


            </div>
            <div className="chat-footer">
                <form className="message-form">
                    <input
                        maxLength={40}
                        type="text"
                        className="message-input"
                        placeholder="Введите сообщение"/>
                    <button
                        className="send-button">Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Message;