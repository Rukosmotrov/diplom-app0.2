import React, {FC, useEffect, useState} from 'react';
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
import {useAuth} from "../../providers/useAuth";
import {doc, getDoc} from "firebase/firestore";

const Profile:FC = () => {
    const {user, db} = useAuth();
    const [data, setData] = useState<any>({
        firstName: '',
        lastName: '',
        cityOfResidence: '',
        countryOfBirth: '',
        birthDate: ''
    });

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data());
        } else {
            return console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserDataFromDoc();
    }, []);
    return (
        <Container>
            <UserInfo data={data}/>
            <Grid container spacing={5} direction='row'>
                <Grid item xs={5}>
                    <Box className='leftSide'>
                        <ShortUserInfo data={data}/>
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