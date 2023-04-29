import React from 'react';
import './localPage.css';
import Header from "../Page UI/Header/header";
import LocalThem from "./Local UI/Local them/localThem";
import LocalInfo from "./Local UI/Local info/localInfo";
import LocalAvatar from "./Local UI/Local avatar/localAvatar";
import LocalNav from "./Local UI/Local nav/localNav";
import PostContainer from "./Local UI/Local Post/postContainer";

function LocalPage() {
    return (
        <div className={'local__page'}>
            <div className={'local__container'}>
                <Header/>
                <LocalThem/>
                <LocalInfo/>
                <LocalAvatar/>
                <LocalNav/>
                <PostContainer/>
            </div>
        </div>
    );
}

export default LocalPage;