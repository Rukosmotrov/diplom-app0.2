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
import {userData} from '../data/userData';

const Menu:FC<IMenu> = ({menuOpen, closeMenu}) => {
    const navigate = useNavigate();

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
                            avatar={<Avatar alt='User' src={userData.avatar}/>}
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
                    <Button>Log Out</Button>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Menu;