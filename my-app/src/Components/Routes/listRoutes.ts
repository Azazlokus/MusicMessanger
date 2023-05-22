import Auth from "../Pages/Auth/Auth";
import News from "../Pages/News/News";
import Profile from "../Pages/Profile/Profile";
import Chat from "../Pages/Chat/Chat";
import Registration from "../Pages/Registration/Registration";

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
        path: '/chat',
        component: Chat
    },
]

export const publicRoutes = [
    {
        path: '/',
        component: Auth
    },
    {
        path: '/registration',
        component: Registration
    }
]