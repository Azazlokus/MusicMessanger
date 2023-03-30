import React from 'react';
import '../LocalTitleBar/localTitleBar.css'

function LocalTitleBar() {
    return ( 
        <div className='local__bar'>
            <div className="local__bar_about">
                <h1 className="local__bar_title">Marina Joe</h1>
                <p className="local__bar_friends">20 friends</p>
            </div>

            <button className='local__bar_btn'>Edit Profile</button>
        </div>
    );
}

export default LocalTitleBar;