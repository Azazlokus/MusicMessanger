import React, {FC} from 'react';
import ava from '../../../Img/Avatar.png';
import './SideBar.css';

const SideBar:FC = () => {
    return (
        <div className={'sidebar__container'}>
            <div className={'sidebar__follow'}>
                <h1 className={'sidebar__follow_title'}>following</h1>
                <ul className={'sidebar__follow_list'}>
                    <li className={'sidebar__follow_item'}>
                        <img src={ava} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                        <h1 className={'sidebar__follow_name'}>Azamat1488</h1>
                    </li>
                    <li className={'sidebar__follow_item'}>
                        <img src={ava} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                        <h1 className={'sidebar__follow_name'}>Azamat1488</h1>
                    </li>
                    <li className={'sidebar__follow_item'}>
                        <img src={ava} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                        <h1 className={'sidebar__follow_name'}>Azamat1488</h1>
                    </li>
                    <li className={'sidebar__follow_item'}>
                        <img src={ava} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                        <h1 className={'sidebar__follow_name'}>Azamat1488</h1>
                    </li>
                    <li className={'sidebar__follow_item'}>
                        <img src={ava} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                        <h1 className={'sidebar__follow_name'}>Azamat1488</h1>
                    </li>
                </ul>
            </div>

            <div className={'sidebar__nav'}>

            </div>
        </div>
    );
};

export default SideBar;