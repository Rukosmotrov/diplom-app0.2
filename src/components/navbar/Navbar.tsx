import React, {FC, useState} from 'react';
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
import {INavbar} from "../../interfaces";
import {userData} from '../data/userData';

const Navbar:FC<INavbar> = ({openMenu}) => {
    const [searchActive, setSearchActive] = useState<boolean>(false);

    return (
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
                                <Avatar alt='User avatar' src={userData.avatar}/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
    );
};

export default Navbar;