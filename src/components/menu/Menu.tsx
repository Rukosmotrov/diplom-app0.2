import React, {FC} from 'react';
import {
    Avatar, Badge,
    Button,
    Card,
    CardHeader,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {IMenu} from "../../interfaces";
import {useNavigate} from "react-router-dom";
import {MenuData} from "../data/MenuData";
import {generalUserData} from '../data/generalUserData';
import {useAuth} from "../providers/useAuth";
import {signOut} from 'firebase/auth';

const Menu:FC<IMenu> = ({menuOpen, closeMenu}) => {
    const navigate = useNavigate();
    const {user, ga} = useAuth();

    return (
        <Drawer
            anchor="left"
            open={menuOpen}
            onClose={closeMenu}
        >
            <List className='menu'>
                <ListItem>
                    <Card>
                        <CardHeader
                            avatar={<Avatar alt='User' src={user?.avatar}/>}
                            title={'Denys Rukosmotrov'}
                            subheader={'online'}
                        />
                    </Card>
                    <Divider/>
                </ListItem>
                {MenuData.map(item => {
                    return (
                        <ListItem key={item.path}>
                            <Button
                                sx={{width:'100%'}}
                                onClick={() => {
                                    navigate(item.path);
                                    closeMenu();
                                }}>
                                <ListItemIcon>
                                    <item.icon/>
                                </ListItemIcon>
                                <ListItemText primary={item.pageName}/>
                            </Button>
                        </ListItem>
                    )
                })}
                <ListItem>
                    <Button onClick={() => {
                        signOut(ga)
                        closeMenu()
                    }}>Log Out</Button>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Menu;