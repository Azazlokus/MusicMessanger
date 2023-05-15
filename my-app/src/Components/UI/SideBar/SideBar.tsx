import React, {FC} from 'react';
import ava from '../../../Img/Avatar.png';

const SideBar:FC = () => {
    return (
        <div className={'sidebar__container'}>
            <ul className={'sidebar__follow'}>
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

            <div className={'sidebar__nav'}>

            </div>
        </div>
    );
};

export default SideBar;