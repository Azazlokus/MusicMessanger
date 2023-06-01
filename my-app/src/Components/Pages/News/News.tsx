import React from 'react';
import Header from "../../UI/Header/Header";
import SideBar from "../../UI/SideBar/SideBar";
import './News.css';
import PostForm from "../../UI/Posts/PostForm";
import PostList from "../../UI/Posts/PostList";


const News = () => {

    return (
        <div className={'news__wrapper'}>
            <Header/>
            <div className={'news__content'}>
                <SideBar/>
                <div className={'news__posts'}>
                    <PostForm />
                    <PostList />
                </div>
            </div>
        </div>
    );
};

export default News;