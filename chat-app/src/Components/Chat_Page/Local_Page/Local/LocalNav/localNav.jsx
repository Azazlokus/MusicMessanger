import React from 'react';
import '../LocalNav/localNav.css'

function LocalNav() {
    return ( 
        <ul className="local__nav">
            <li className="local__nav_item">
                <button className="local__nav_btn">Post</button>
            </li>
            <li className="local__nav_item">
                <button className="local__nav_btn">About</button>
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