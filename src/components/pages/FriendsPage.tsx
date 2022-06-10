import React, {FC, useEffect, useState} from 'react';
import {Container, Typography} from "@mui/material";
import {useAuth} from "../providers/useAuth";
import {IUserInfo} from "../../interfaces";
import {doc, getDoc} from "firebase/firestore";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";

const FriendsPage:FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <Container>
            <Navbar openMenu={() => setMenuOpen(true)}/>
            <Typography variant='h3'>
                Friends
            </Typography>
            <Menu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)}/>
        </Container>
    );
};

export default FriendsPage;