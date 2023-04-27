import React from 'react';
import './localInfo.css';

function LocalInfo() {
    return (
        <div className={'info__container'}>
            <h1 className={'info__name'}>Щеглов Максим</h1>

            <div className={'follow__container'}>
                <div className={'follow__following'}>
                    <h2 className={'follow__following_text'}>following</h2>
                    <p className={'follow__following_count'}>0</p>
                </div>

                <div className={'follow__followers'}>
                    <h2 className={'follow__followers_text'}>followers</h2>
                    <p className={'follow__followers_count'}>0</p>
                </div>
            </div>
        </div>
    );
}

export default LocalInfo;