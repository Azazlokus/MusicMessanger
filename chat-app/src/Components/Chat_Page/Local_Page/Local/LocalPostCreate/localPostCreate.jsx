import React from 'react';
import '../LocalPostCreate/localPostCreate.css'
import { Icon } from '@iconify/react';

function LocalPostCreate() {
    return (
        <div className="local__create">
            <button className="local__create_btn">Create post</button>

            <div className="local__create_search">
                <Icon className='local__search_icon' icon="material-symbols:screen-search-desktop-outline" color="white" />
                <input type="text" className="local__search_input" />
            </div>
        </div>
    );
}

export default LocalPostCreate;