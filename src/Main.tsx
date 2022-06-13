import React, {FC, MutableRefObject, useRef, useState, useEffect, createContext} from 'react';
import {
    Box, Container
} from "@mui/material";
import './style.scss'
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Footer from "./components/Footer";
import {BrowserRouter} from "react-router-dom"
import Routers from "./components/router/Routers";
import {useImportUserData} from "./components/hooks/useImportUserData";
import {useAuth} from "./components/providers/useAuth";
import {IUserInfo} from "./interfaces";
import {doc, getDoc} from "firebase/firestore";
import Loader from "./components/loader/Loader";


const Main:FC = () => {
    // const [isMenuOpen, setMenuOpen] = useState(false);
    const {user, db, ga} = useAuth();

    // if (!user) {
    //     return <Loader/>
    // }

    return (
        <BrowserRouter>
            <Box className='main'>
                {/*<Navbar openMenu={() => setMenuOpen(true)}/>*/}
                <Container>
                    <Routers/>
                </Container>
                {/*<Menu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)} data={data}/>*/}
            </Box>
        </BrowserRouter>
    );
};

export default Main;