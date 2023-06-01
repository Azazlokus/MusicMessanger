import React, {FC} from 'react';
import './SideBar.css';
import {useAuth} from "../../Provider/useAuth";
import {signOut} from 'firebase/auth'

const SideBar:FC = () => {
    const {users, user, gAuth} = useAuth()

    return (
        <div className={'sidebar__container'}>
            <div className={'sidebar__follow'}>
                <h1 className={'sidebar__follow_title'}>following</h1>
                <ul className={'sidebar__follow_list'}>
                    {users.map(usr => (
                        <li key={usr._id} className={'sidebar__follow_item'}>
                            <img src={usr.avatar} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                            <h1 className={'sidebar__follow_name'}>{usr.name}</h1>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={'sidebar__nav'}>
                {user && (
                    <button onClick={() => signOut(gAuth)}>Exit</button>
                )}
            </div>
        </div>
    );
};

export default SideBar;