import React, {FC, useState} from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Drawer
} from "@mui/material";
import classes from '../../styles/messagePage.module.scss'
import Conversation from "./Conversation";
import ConvsList from "./ConvsList";
import Navbar from "../../navbar/Navbar";
import Menu from "../../menu/Menu";

const MessagesPage:FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <Container sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Navbar openMenu={() => setMenuOpen(true)}/>
            <Grid container direction='row'>
                <Grid item xs={3}>
                    <ConvsList/>
                </Grid>
                <Grid item xs={9}>
                    <Conversation/>
                </Grid>
            </Grid>
            <Menu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)}/>
        </Container>
    );
};

export default MessagesPage;