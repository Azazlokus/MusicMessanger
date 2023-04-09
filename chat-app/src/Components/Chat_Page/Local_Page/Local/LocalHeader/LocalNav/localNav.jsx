import React from 'react';
import '../LocalNav/localNav.css'

function LocalNav({setPostVisiable, setAboutVisiable, aboutVisiable, postViasiable}) {
    function postVisiable(){
        if(postViasiable !== true){
            setPostVisiable(true)
            setAboutVisiable(false)
        }
        else{
            setPostVisiable(false)
            setAboutVisiable(false)
        }

    }
    function aboutViasiable(){
        if(aboutVisiable !== true){
            setAboutVisiable(true)
            setPostVisiable(false)
        }
        else{
            setPostVisiable(false)
            setAboutVisiable(false)
        }
    }
    return ( 
        <ul className="local__nav">
            <li className="local__nav_item">
                <button onClick={postVisiable} className="local__nav_btn">Post</button>
            </li>
            <li className="local__nav_item">
                <button onClick={aboutViasiable} className="local__nav_btn">About</button>
            </li>
            <li className="local__nav_item">
                <button className="local__nav_btn">Friends</button>
            </li>
            <li className="local__nav_item">
                <button className="local__nav_btn">Photos</button>
            </li>
            <li className="local__nav_item">
                <button className="local__nav_btn">Videos</button>
            </li>
            <li className="local__nav_item">
                <button className="local__nav_btn">More</button>
            </li>
        </ul>
     );
}

export default LocalNav;