import React, {FC, useEffect, useState} from 'react';
import {
    Accordion,
    Button,
    Container,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    AccordionSummary,
    AccordionDetails,
    Card,
    Box,
    Grid, Avatar, TextField
} from "@mui/material";
import ImageUploader from "../utils/ImageUploader";
import {generalUserData} from '../data/generalUserData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useAuth} from "../providers/useAuth";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {IUserInfo} from "../../interfaces";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ImageIcon from '@mui/icons-material/Image';

const SettingsPage:FC = () => {
    const [isAvatarChanging, setAvatarChanging] = useState(false);
    const [isBgChanging, setBgChanging] = useState(false);
    const {user, db} = useAuth();
    const [data, setData] = useState<IUserInfo>();

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data().data);
        } else {
            return console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserDataFromDoc();
    }, []);

    const changeAvatar = async (newAvatar:string | undefined) => {
        const postDocRef = doc(db, `${user?.email}`, "userData");
        await updateDoc(postDocRef, {
            data: {...data, avatar: newAvatar}
        });
    }

    const changeBgImg = async (newBgImg:string | undefined) => {
        const postDocRef = doc(db, `${user?.email}`, "userData");
        await updateDoc(postDocRef, {
            data: {...data, bgImg: newBgImg}
        });
    }

    const [newUserInfo, setNewUserInfo] = useState<any>(data);

    const updateUserData = async () => {
        const postDocRef = doc(db, `${user?.email}`, "userData");
        await updateDoc(postDocRef, {
            data: {...data, ...newUserInfo}
        });
    }

    return (
        <Container sx={{p:5}}>
            <Card sx={{p:2}}>
                <Grid container direction='column' spacing={2}>
                    <Grid item sx={{display: 'flex', justifyContent: 'center'}}>
                        <Avatar alt='User' src={data?.avatar} sx={{
                            position: 'relative',
                            width: '150px',
                            height: '150px',
                            border: '5px solid #eaebed',
                            mb:2
                        }}/>
                    </Grid>
                    <Divider/>
                    <Grid item>
                        <Button
                            onClick={() => setAvatarChanging(true)}>
                            <ListItemText primary={'Change avatar'}/>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                        </Button>
                    </Grid>
                    <Divider/>
                    <ImageUploader
                        isOpen={isAvatarChanging}
                        closeModal={() => setAvatarChanging(false)}
                        changer={changeAvatar}
                    />
                    <Grid item>
                        <Button
                            onClick={() => setBgChanging(true)}>
                            <ListItemText primary={'Change background image'}/>
                            <ListItemIcon>
                                <ImageIcon/>
                            </ListItemIcon>
                        </Button>
                    </Grid>
                    <Divider/>
                    <ImageUploader
                        isOpen={isBgChanging}
                        closeModal={() => setBgChanging(false)}
                        changer={changeBgImg}
                    />
                </Grid>
                <br/>
                <Grid container spacing={5}>
                    <Grid container direction="row" item spacing={5} xs={12}>
                        <Grid item xs={4}>
                            <TextField
                                type='text'
                                label='First name'
                                variant='outlined'
                                value={newUserInfo?.firstName}
                                onChange={e => setNewUserInfo( {...newUserInfo, firstName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                type='text'
                                label='Last name'
                                variant='outlined'
                                value={newUserInfo?.lastName}
                                onChange={e => setNewUserInfo( {...newUserInfo, lastName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                type='text'
                                label='Date of birth'
                                variant='outlined'
                                value={newUserInfo?.birthDate}
                                onChange={e => setNewUserInfo( {...newUserInfo, birthDate: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={5} xs={12}>
                        <Grid item xs={4}>
                            <TextField
                                type='text'
                                label='Country of birth'
                                variant='outlined'
                                value={newUserInfo?.countryOfBirth}
                                onChange={e => setNewUserInfo( {...newUserInfo, countryOfBirth: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                type='text'
                                label='Country of residence'
                                variant='outlined'
                                value={newUserInfo?.countryOfResidence}
                                onChange={e => setNewUserInfo( {...newUserInfo, countryOfResidence: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                type='text'
                                label='City of residence'
                                variant='outlined'
                                value={newUserInfo?.cityOfResidence}
                                onChange={e => setNewUserInfo( {...newUserInfo, cityOfResidence: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <br/>
                <Divider/>
                <br/>
                <Button variant='contained' onClick={updateUserData}>Save</Button>
            </Card>
        </Container>
    );
};

export default SettingsPage;