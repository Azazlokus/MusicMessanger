import React, {FC} from 'react';
import './SideBar.css';
import {useAuth} from "../../Provider/useAuth";
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore";
import {IUser} from "../../../Type";
import {Link} from "react-router-dom";


const SideBar: FC = () => {
    const {users, setUsers, base, user, gAuth} = useAuth()
    const [userName, setUserName] = React.useState<string>('')
    const [searchResults, setSearchResults] = React.useState<IUser[]>([]);
    const [followArr, setFollowArr] = React.useState<string[]>([])

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
        const unsub = onSnapshot(collection(base, 'users'), doc => {
            const arr: IUser[] = [];
            doc.forEach((d: any) => {
                arr.push(d.data())

            });

            setUsers(arr.sort((a, b) => parseInt(a._id) - parseInt(b._id)));
        });


        return () => {
            unsub();
        };
    }, []);

    React.useEffect(() => {
        const followArray = async () => {
            if (user) {
                const userRef = doc(base, 'users', user._id);
                const userSnapshot = await getDoc(userRef);
                const fetchedUser = userSnapshot.data() as IUser;
                if (fetchedUser) {
                    setFollowArr((prevFollowArr) => [...prevFollowArr, ...fetchedUser.follow]);
                }
            }
        };

        followArray();
    }, []);


    return (
        <div className={'sidebar__container'}>
            <div className={'sidebar__follow'}>
                <h1 className={'sidebar__follow_title'}>following</h1>
                <ul className={'sidebar__follow_list'}>
                    {user &&
                        followArr.length > 0 &&
                        followArr.map((followedUserId) => {
                            const followedUser = users.find((usr) => usr._id === followedUserId);
                            if (followedUser) {
                                return (
                                    <li key={followedUser._id} className={'sidebar__follow_item'}>
                                        <img
                                            src={followedUser.avatar}
                                            alt={'Avatar'}
                                            className={'sidebar__follow_avatar'}
                                        />
                                        <h1 className={'sidebar__follow_name'}>{followedUser.name}</h1>
                                    </li>
                                );
                            }
                            return null;
                        })}
                </ul>
            </div>

            <div className={'sidebar__nav'}>
                <h1 style={{alignSelf: 'center', fontSize: '20px', fontWeight: '500'}}>Users</h1>
                <input
                    onKeyUp={userSearch}
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className={'sidebar__users_input'}/>
                <ul className={'sidebar__users'}>
                    {searchResults.length > 0 ? (
                        searchResults.slice(0, 6).map(usr => (
                            <Link className={'link__online'} key={usr._id} to={`/profile/id:${usr._id}`}>
                                <li className={'sidebar__follow_item'}>
                                    <img src={usr.avatar} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
                                    <h1 className={'sidebar__follow_name'}>{usr.name}</h1>
                                </li>
                            </Link>
                        ))
                    ) : (
                        users.slice(0, 6).map(usr => (
                            <Link className={'link__online'} key={usr._id} to={`/profile/id:${usr._id}`}>
                                <li className={'sidebar__follow_item'}>
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


/*
<li key={followers._id} className={'sidebar__follow_item'}>
    <img src={followers.avatar} alt={'Avatar'} className={'sidebar__follow_avatar'}/>
    <h1 className={'sidebar__follow_name'}>{followers.name}</h1>
</li>
 */
