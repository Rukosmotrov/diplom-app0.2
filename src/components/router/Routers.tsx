import React from 'react';
import {Route, Routes} from "react-router-dom";
import UserPage from "../pages/UserPage";
import NewsPage from "../pages/NewsPage";
import PageNotFound from "../pages/PageNotFound";
import MessagesPage from "../pages/MessagesPage";
import SettingsPage from "../pages/SettingsPage";

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<UserPage/>}/>
            <Route path='/news' element={<NewsPage/>}/>
            <Route path='/messages' element={<MessagesPage/>}/>
            <Route path='/settings' element={<SettingsPage/>}/>
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    );
};

export default Routers;