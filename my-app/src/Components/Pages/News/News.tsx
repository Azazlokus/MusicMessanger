import React from 'react';
import Header from "../../UI/Header/Header";
import SideBar from "../../UI/SideBar/SideBar";
import './News.css';

const News = () => {
    return (
        <div className={'news__wrapper'}>
            <Header/>
            <div className={'news__content'}>
                <SideBar/>
                <div className={'news__posts'}>
                    dw
                </div>
            </div>
        </div>
    );
};

export default News;