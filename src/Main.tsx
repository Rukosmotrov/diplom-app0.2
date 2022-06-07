import React, {FC, MutableRefObject, useRef, useState, useEffect} from 'react';
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
    const [isMenuOpen, setMenuOpen] = useState(false);
    const {user, db, ga} = useAuth();
    const [data, setData] = useState<IUserInfo>();

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data().data);
            console.log('main docSnap: ', docSnap.data().data);
            console.log('main data: ', data);
        } else {
            return console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserDataFromDoc();
    }, []);

    if (!user) {
        return <Loader/>
    }

    return (
        <BrowserRouter>
            <Box className='main'>
                <Navbar openMenu={() => setMenuOpen(true)} data={data}/>
                <Container>
                    <Routers/>
                </Container>
                <Menu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)} data={data}/>
            </Box>
            <Footer/>
        </BrowserRouter>
    );
};

export default Main;