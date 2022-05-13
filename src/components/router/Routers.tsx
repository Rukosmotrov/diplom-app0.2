import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./list";
import {useAuth} from "../providers/useAuth";

const Routers = () => {
    const {user} = useAuth();
    return (
        user
            ?
            <Routes>
                {privateRoutes.map(item =>
                    <Route key={item.path} path={item.path} element={<item.element/>}/>
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(item =>
                    <Route key={item.path} path={item.path} element={<item.element/>}/>
                )}
            </Routes>
    );
};

export default Routers;