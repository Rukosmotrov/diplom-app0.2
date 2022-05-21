import NewsPage from "../pages/news/NewsPage";
import MessagesPage from "../pages/messages/MessagesPage";
import SettingsPage from "../pages/SettingsPage";
import PageNotFound from "../pages/PageNotFound";
import FriendsPage from "../pages/FriendsPage";
import Profile from "../pages/profile/Profile";
import SignInPage from "../pages/auth/SignInPage";
import SignUpPage from "../pages/auth/SignUpPage";

export const privateRoutes = [
    {
        path: '/home',
        element: Profile,
        auth: true
    },
    {
        path: '/profile:id',
        element: Profile,
        auth: true
    },
    {
        path: '/news',
        element: NewsPage,
        auth: true
    },
    {
        path: '/friends',
        element: FriendsPage,
        auth: true
    },
    {
        path: '/friends:id',
        element: FriendsPage,
        auth: true
    },
    {
        path: '/messages',
        element: MessagesPage,
        auth: true
    },
    {
        path: '/message:id',
        element: MessagesPage,
        auth: true
    },
    {
        path: '/settings',
        element: SettingsPage,
        auth: true
    },
    {
        path: '*',
        element: Profile
    },
];

export const publicRoutes = [
    {
        path: '/sign-in',
        element: SignInPage,
        auth: false
    },
    {
        path: '/sign-up',
        element: SignUpPage,
        auth: false
    },
    {
        path: '*',
        element: SignInPage
    }
];