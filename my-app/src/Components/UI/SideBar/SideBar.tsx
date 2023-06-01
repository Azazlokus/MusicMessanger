import React, {FC} from 'react';
import './SideBar.css';
import {useAuth} from "../../Provider/useAuth";
import {signOut} from 'firebase/auth'
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import {IPost, IUser} from "../../../Type";
import {Link} from "react-router-dom";

const SideBar:FC = () => {
    const {users, setUsers, base, user, gAuth} = useAuth()
    const [userName, setUserName] = React.useState<string>('')
    const [searchResults, setSearchResults] = React.useState<IUser[]>([]);

    const userSearch = (e: any) => {
        const searchString = e.target.value.toLowerCase();
        if (searchString === '') {
            setSearchResults([]);
        } else {
            const results = users.filter(user => user.name.toLowerCase().includes(searchString));
            setSearchResults(results);
        }
    };

    React.useEffect(() => {
        const unsub = onSnapshot(collection(base, 'users', ), doc => {
            const arr:IUser[] = []
            doc.forEach((d:any) => {
                arr.push(d.data())
            })
            arr.map(ar => {

            })
            setUsers(arr.sort((a,b) => parseInt(a._id) - parseInt(b._id)))
        })

        return () => {
            unsub()
        }
    }, [])
    console.log(users)
    return (
        <div className={'sidebar__container'}>
            <div className={'sidebar__follow'}>
                <h1 className={'sidebar__follow_title'}>following</h1>
                <ul className={'sidebar__follow_list'}>
                    {user && user.follow.length > 0 ? user.follow.map(followers => (
                        <li key={followers._id} className={'sidebar__follow_item'}>
                            <img src={followers.avatar} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                            <h1 className={'sidebar__follow_name'}>{followers.name}</h1>
                        </li>
                    )): <></>}
                </ul>
            </div>

            <div className={'sidebar__nav'}>
                <input
                    onKeyUp={userSearch}
                    value={userName}
                    onChange={e=> setUserName(e.target.value)}
                    className={'sidebar__users_input'}/>
                <ul className={'sidebar__users'}>
                    {searchResults.length > 0 ? (
                        searchResults.slice(0,6).map(usr => (
                            <Link key={usr._id} to={`/profile/id:${usr._id}`}>
                                <li className={'sidebar__follow_item'}>
                                    <img src={usr.avatar} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                                    <h1 className={'sidebar__follow_name'}>{usr.name}</h1>
                                </li>
                            </Link>
                        ))
                    ) : (
                        users.slice(0, 6).map(usr => (
                            <Link key={usr._id} to={`/profile/id:${usr._id}`}>
                                <li  className={'sidebar__follow_item'}>
                                    <img src={usr.avatar} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                                    <h1 className={'sidebar__follow_name'}>{usr.name}</h1>
                                </li>
                            </Link>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;