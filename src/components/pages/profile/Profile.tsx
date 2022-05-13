import React, {FC} from 'react';
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

const Profile:FC = () => {
    return (
        <Container>
            <UserInfo/>
            <Grid container spacing={5} direction='row'>
                <Grid item xs={5}>
                    <Box className='leftSide'>
                        <ShortUserInfo/>
                        <MusicBox/>
                        <ShowAllFriends/>
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <Posts/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;