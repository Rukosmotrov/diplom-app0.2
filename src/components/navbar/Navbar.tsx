import React, {FC, useEffect, useState} from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Badge
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import classes from './navbar.module.scss'
import {INavbar, IUserInfo} from "../../interfaces";
import {useAuth} from "../providers/useAuth";
import {doc, getDoc} from "firebase/firestore";

const Navbar:FC<INavbar> = ({openMenu}) => {
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const {user, db} = useAuth();
    const [data, setData] = useState<IUserInfo>();

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data().data);
            console.log('navbar docSnap: ', docSnap.data().data);
            console.log('navbar data: ', data);
        } else {
            return console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserDataFromDoc();
    }, []);

    return (
        user
        ?
            <AppBar className={classes.navbar}>
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    <Box>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={openMenu}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <IconButton
                            size="medium"
                            color="inherit"
                            sx={{ mr: 2 }}
                        >
                            {'yikes!'}
                        </IconButton>
                    </Box>
                    <Box className={classes.wrapper}>
                        {!searchActive && <SearchIcon/>}
                        <input
                            type="text"
                            placeholder='Search'
                            onFocus={() => setSearchActive(true)}
                            onBlur={() => setSearchActive(false)}
                        />
                    </Box>
                    <Box>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Avatar alt='User avatar' src={data?.avatar}/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            :
            <AppBar className={classes.navbar}>
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    <IconButton
                        size="medium"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        {'yikes!'}
                    </IconButton>
                </Toolbar>
            </AppBar>
    );
};

export default Navbar;