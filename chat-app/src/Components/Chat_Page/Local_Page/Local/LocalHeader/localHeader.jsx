import React from 'react';
import '../LocalHeader/localHeader.css'
import LocalAvatar from './LocalAvatar/localAvatar';
import LocalBackground from './LocalBackground/localBackground';
import LocalNav from './LocalNav/localNav';
import LocalPostCreate from './LocalPostCreate/localPostCreate';
import LocalTitleBar from './LocalTitleBar/localTitleBar';

function LocalHeader({setPostFormVisiable, postFormVisiable}) {
    return (
        <section className="local__header">
            <LocalBackground/>
            <LocalAvatar/>
            <LocalTitleBar />
            <LocalNav />
            <LocalPostCreate setPostFormVisiable={setPostFormVisiable} postFormVisiable={postFormVisiable} />
        </section>
    );
}

export default LocalHeader;