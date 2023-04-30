import React from 'react';
import './localNav.css';

function LocalNav({setPostVisible, postVisible}) {
    function visiblePost(){
        if(!postVisible){
            setPostVisible(true)
        }else{
            setPostVisible(false)
        }
    }
    return (
        <div className={'local__nav nav'}>
            <ul className={'nav__list'}>
                <button onClick={visiblePost} className={'nav__list__item'}>posts</button>
                <button className={'nav__list__item'}>photo</button>
                <button className={'nav__list__item'}>music</button>
                <button className={'nav__list__item'}>video</button>
            </ul>
        </div>
    );
}

export default LocalNav;