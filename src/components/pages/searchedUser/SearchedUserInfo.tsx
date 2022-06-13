import React, {FC, useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardMedia,
    Divider,
    Grid,
    CardHeader,
    CardContent,
    Typography, CardActions, ListItem, List, ListItemIcon, ListItemText, Avatar, Box
} from "@mui/material";
import {IUserInfo} from "../../../interfaces";
import {useAuth} from "../../providers/useAuth";
import {doc, getDoc} from "firebase/firestore";

const SearchedUserInfo:FC = () => {
    const {user, db} = useAuth();
    const [currentUser, setCurrentUser] = useState<any>();
    const [data, setData] = useState<IUserInfo>();
    const [signedUserData, setSignedUserData] = useState<any>();

    const getCurrentUserFromDoc = async () => {
        const docRef = doc(db, "usersList", "currentUser");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
        } else {
            return console.log("No such document!");
        }
    }

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${currentUser?.currentUser.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data().data);
        } else {
            return console.log("No such document!");
        }
    }

    const getUserSignedDataFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setSignedUserData(docSnap.data().data);
        } else {
            return console.log("No such document!");
        }
    }

    useEffect(() => {
        getCurrentUserFromDoc();
        getUserSignedDataFromDoc();
    }, []);

    useEffect(() => {
        getUserDataFromDoc();
    }, [currentUser]);

    return (
        <Grid container spacing={5} direction='row'>
            <Grid item xs={12}>
                <div className='user-header' style={{backgroundImage: `url(${data?.bgImg})`}}>
                    <Avatar alt='User' src={data?.avatar} sx={{
                        position: 'relative',
                        width: '150px',
                        height: '150px',
                        border: '5px solid #eaebed',
                    }}/>
                </div>
                <Card className='user-header-bottom'>
                    <Typography variant={'h5'}>{`${data?.firstName} ${data?.lastName}`}</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography sx={{width:'150px'}}>{`Followers: 0`}</Typography>
                        <Typography sx={{width:'150px'}}>{`Subscriptions: 0`}</Typography>
                    </Box>
                    <CardActions>
                        <Button variant='contained' onClick={() => {
                            console.log('Current user email: ', currentUser.currentUser.email);
                            console.log('Current data: ', data);
                        }}
                                sx={{width:'150px', m:'0 20px'}}>Follow</Button>
                        <Button variant='contained' sx={{width:'150px', m:'0 20px'}}>Message</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SearchedUserInfo;