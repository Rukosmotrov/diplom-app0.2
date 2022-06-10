import React, {FC, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardMedia,
    Divider,
    Grid,
    CardHeader,
    CardContent,
    Typography, CardActions, ListItem, List, ListItemIcon, ListItemText, Avatar
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {IUserInfo} from "../../interfaces";
import {useAuth} from "../providers/useAuth";
import {doc, getDoc} from "firebase/firestore";

const UserInfo:FC = () => {
    const {user, db} = useAuth();
    const [data, setData] = useState<IUserInfo>();
    const [names, setNames] = useState<any>();

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data().data);
        } else {
            return console.log("No such document!");
        }
    }

    const getUsersFromDoc = async () => {
        const docRef = doc(db, "usersNames", "names");
        const docSnap = await getDoc(docRef);
        const someDoc = [];
        if (docSnap.exists()) {
            docSnap.data().map((name:any) => setNames({...names, user: name}));
            console.log('New names: ', names);
        } else {
            return console.log("No such document!");
        }
        //setNames({...names, user: name})
    }

    useEffect(() => {
        getUserDataFromDoc();
        getUsersFromDoc();
    }, []);
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
                    <CardActions>
                        <Button variant='contained' sx={{width:'150px', m:'0 20px'}}>Follow</Button>
                        <Button variant='contained' sx={{width:'150px', m:'0 20px'}}>Message</Button>
                    </CardActions>
                </Card>
            </Grid>
            {/*<Grid item xs={3}>*/}
            {/*    <Card className='avatar' sx={{p:1}}>*/}
            {/*        <CardMedia*/}
            {/*            component='img'*/}
            {/*            height='280px'*/}
            {/*            image= {data?.avatar}*/}
            {/*        />*/}
            {/*        <CardActions sx={{display:'flex', justifyContent:'space-between'}}>*/}
            {/*            <Button variant='contained' sx={{mt:2, width:'100px'}}>Follow</Button>*/}
            {/*            <Button variant='contained' sx={{mt:2, width:'100px'}}>Message</Button>*/}
            {/*        </CardActions>*/}
            {/*    </Card>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={9}>*/}
            {/*    <Card sx={{p:1, height: '350px'}}>*/}
            {/*        <CardContent>*/}
            {/*            <Typography variant={'h5'}>{`${data?.firstName} ${data?.lastName}`}</Typography>*/}
            {/*            <Divider/>*/}
            {/*            <List>*/}
            {/*                <ListItem>*/}
            {/*                    <ListItemIcon>*/}
            {/*                        <HomeIcon/>*/}
            {/*                    </ListItemIcon>*/}
            {/*                    <ListItemText primary={`Living in: ${data?.cityOfResidence}`}/>*/}
            {/*                </ListItem>*/}
            {/*                <ListItem>*/}
            {/*                    <ListItemIcon>*/}
            {/*                        <LocationOnIcon/>*/}
            {/*                    </ListItemIcon>*/}
            {/*                    <ListItemText primary={`Born in: ${data?.countryOfBirth}`}/>*/}
            {/*                </ListItem>*/}
            {/*                <ListItem>*/}
            {/*                    <ListItemIcon>*/}
            {/*                        <ChildFriendlyIcon/>*/}
            {/*                    </ListItemIcon>*/}
            {/*                    <ListItemText primary={`Birth date: ${data?.birthDate}`}/>*/}
            {/*                </ListItem>*/}
            {/*            </List>*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}
            {/*</Grid>*/}
        </Grid>
    );
};

export default UserInfo;