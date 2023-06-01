import Auth from "../Pages/Auth/Auth";
import News from "../Pages/News/News";
import Profile from "../Pages/Profile/Profile";
import Chat from "../Pages/Chat/Chat";


export const privateRoutes = [
    {
        path: '/news',
        component: News
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/profile/:id',
        component: Profile
    },
    {
        path: '/chat',
        component: Chat
    },
    {
        path: '/chat/:id',
        component: Chat
    },
]

export const publicRoutes = [
    {
        path: '/',
        component: Auth
    },
]