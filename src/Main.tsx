import React, {FC, MutableRefObject, useRef, useState} from 'react';
import {
    Box, Container
} from "@mui/material";
import './style.scss'
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Footer from "./components/Footer";
import {BrowserRouter} from "react-router-dom"
import Routers from "./components/router/Routers";

const Main:FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <BrowserRouter>
            <Box className='main'>
                <Navbar openMenu={() => setMenuOpen(true)}/>
                <Container>
                    <Routers/>
                </Container>
                <Menu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)}/>
            </Box>
        </BrowserRouter>
    );
};

export default Main;