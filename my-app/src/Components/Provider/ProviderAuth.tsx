import React, {createContext, FC} from "react";
import {IUser, TypeSetState} from "../../Type";
import {getAuth, onAuthStateChanged, Auth} from 'firebase/auth';
import {getFirestore, Firestore} from 'firebase/firestore';
import ava from '../../Img/Avatar.png'

interface IContext {
    user: IUser | null
    setUser: TypeSetState<IUser | null>
    gAuth: Auth
    base: Firestore
    users: IUser[]
    setUsers: TypeSetState<IUser[]>
}
interface AuthProv {
    children: any
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC<AuthProv> = ({children}) => {
    const [users, setUsers] = React.useState<IUser[]>([])
    const [user, setUser] = React.useState<IUser | null>(null)
    const gAuth = getAuth()
    const base = getFirestore()

    React.useEffect(() => {
        const unListen = onAuthStateChanged( gAuth, authUser => {
            if(authUser){
                const newUser: IUser = {
                    _id: authUser.uid,
                    avatar: ava,
                    name: authUser.displayName || '',
                    follow: []
                };

                setUser(newUser);

            }else{
                setUser(null)
            }

        })
        return () => {
            unListen()
        }
    }, [])

    const values = React.useMemo(() => ({
        user,
        setUser,
        gAuth,
        base,
        users,
        setUsers
    }), [user, gAuth, base, users])

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}