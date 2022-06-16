import React, {FC, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardMedia,
    Divider,
    Grid,
    CardHeader,
    CardContent,
    Typography, CardActions, ListItem, List, ListItemIcon, ListItemText, Avatar,
    Box
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {IUserInfo} from "../../interfaces";
import {useAuth} from "../providers/useAuth";
import {doc, getDoc} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../loader/Loader";
import {getDownloadURL, getStorage, ref} from "firebase/storage";

const UserInfo:FC = () => {
    const {user, db, ga} = useAuth();
    const [data, setData] = useState<IUserInfo>();
    const [usr, loading, error] = useAuthState(ga);
    const [avatarUrl, setAvatarUrl] = useState<any>();
    const [bgImgUrl, setBgImgUrl] = useState<any>();
    const storage = getStorage();

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data().data);
            const avatarRef = ref(storage, `${user?.email}/images/${docSnap.data().data.avatar}`);
            getDownloadURL(avatarRef)
                .then((url) => {
                    setAvatarUrl(url);
                });
            const bgImgRef = ref(storage, `${user?.email}/images/${docSnap.data().data.bgImg}`);
            getDownloadURL(bgImgRef)
                .then((url) => {
                    setBgImgUrl(url);
                });
        } else {
            return console.log("No such document!");
        }
    }

    // const getAvatar = async () => {
    //     await getDownloadURL(starsRef)
    //         .then((url) => {
    //             setUrl(url);
    //             return console.log('Url', url);
    //         });
    // }

    useEffect(() => {
        getUserDataFromDoc()
        //getAvatar();
    }, []);

    if (loading) {
        return <Loader/>
    }

    return (
        <Grid container spacing={5} direction='row'>
            <Grid item xs={12}>
                <div className='user-header' style={{backgroundImage: `url(${bgImgUrl ? bgImgUrl : '/'+data?.bgImg})`}}>
                    <Avatar alt='User' src={avatarUrl} sx={{
                        position: 'relative',
                        width: '150px',
                        height: '150px',
                        border: '5px solid #eaebed',
                    }}/>
                </div>
                <Card className='user-header-bottom'>
                    <Typography variant={'h5'}>{`${data?.firstName} ${data?.lastName}`}</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography variant={'h6'} sx={{width:'150px', m:'0 20px'}}>Followers: 0</Typography>
                        <Typography variant={'h6'} sx={{width:'150px', m:'0 20px'}}>Subscribes: 0</Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserInfo;