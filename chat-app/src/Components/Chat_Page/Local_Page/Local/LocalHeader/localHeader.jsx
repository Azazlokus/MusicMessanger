import React from 'react';
import LocalAbout from '../LocalAbout/localAbout';
import '../LocalHeader/localHeader.css'
import LocalAvatar from './LocalAvatar/localAvatar';
import LocalBackground from './LocalBackground/localBackground';
import LocalNav from './LocalNav/localNav';
import LocalPostCreate from './LocalPostCreate/localPostCreate';
import LocalTitleBar from './LocalTitleBar/localTitleBar';

function LocalHeader({ setPostFormVisiable, postFormVisiable, postViasiable, setPostVisiable, setAboutVisiable, aboutVisiable }) {


    return (
        <section className="local__header">
            <LocalBackground />
            <LocalAvatar />
            <LocalTitleBar />
            {
               aboutVisiable && (
                    <LocalAbout />
                )
            }
            <LocalNav  setAboutVisiable={setAboutVisiable} aboutVisiable={aboutVisiable} setPostVisiable={setPostVisiable} postViasiable={postViasiable} />
            {
                postViasiable && (
                    <LocalPostCreate setPostFormVisiable={setPostFormVisiable} postFormVisiable={postFormVisiable} />
                )
            }

        </section>
    );
}

export default LocalHeader;