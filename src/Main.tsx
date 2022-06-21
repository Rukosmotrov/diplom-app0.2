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


const Main:FC = () => {

    return (
        <BrowserRouter>
            <Box className='main'>
                <Container>
                    <Routers/>
                </Container>
            </Box>
        </BrowserRouter>
    );
};

export default Main;