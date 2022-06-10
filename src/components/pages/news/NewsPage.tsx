import React, {FC, useState} from 'react';
import {Box, Typography, Container} from "@mui/material";
import classes from '../../styles/news.module.scss'
import Navbar from "../../navbar/Navbar";
import Menu from "../../menu/Menu";

const NewsPage:FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <Container className={classes.newsBox}>
            <Navbar openMenu={() => setMenuOpen(true)}/>
            <Typography variant={'h3'}>News page</Typography>
            <Box className={classes.news}>
                {'news'}
            </Box>
            <Menu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)}/>
        </Container>
    );
};

export default NewsPage;