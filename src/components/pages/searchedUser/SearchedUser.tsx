import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {
    Box,
    Container,
    Grid,
} from "@mui/material";
import Posts from "../../postsSpace/Posts";
import UserInfo from "../../user/UserInfo";
import ShortUserInfo from "../../user/ShortUserInfo";
import ShowAllFriends from "../../user/ShowAllFriends";
import MusicBox from "../../user/MusicBox";
import {doc, getDoc} from "firebase/firestore";
import {useAuth} from "../../providers/useAuth";
import {IUserInfo} from "../../../interfaces";
import Navbar from "../../navbar/Navbar";
import Menu from "../../menu/Menu";
import SearchedUserInfo from "./SearchedUserInfo";
import SearchedUserShortInfo from "./SearchedUserShortInfo";
import ShowAllSearchedUserFriends from "./ShowAllSearchedUserFriends";
import {UserContext} from "../../context/context";
import SearchedUserPosts from "./searchedUserPostsSpace/SearchedUserPosts";

const SearchedUser:FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <Container>
            <Navbar openMenu={() => setMenuOpen(true)}/>
            <SearchedUserInfo/>
            <Grid container spacing={5} direction='row'>
                <Grid item xs={5}>
                    <Box className='leftSide'>
                        <SearchedUserShortInfo/>
                        <ShowAllSearchedUserFriends/>
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <SearchedUserPosts/>
                </Grid>
            </Grid>
            <Menu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)}/>
        </Container>
    );
};

export default SearchedUser;