import React, {FC, useEffect, useState} from 'react';
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
import {IMenu, IUserInfo} from "../../interfaces";
import {useNavigate} from "react-router-dom";
import {MenuData} from "../data/MenuData";
import {useAuth} from "../providers/useAuth";
import {signOut} from 'firebase/auth';
import {useImportUserData} from "../hooks/useImportUserData";
import {doc, getDoc} from "firebase/firestore";
import MailIcon from "@mui/icons-material/Mail";
import {getDownloadURL, getStorage, ref} from "firebase/storage";

const Menu:FC<IMenu> = ({menuOpen, closeMenu}) => {
    const navigate = useNavigate();
    const {user, ga, db} = useAuth();
    const [data, setData] = useState<IUserInfo>();
    const [avatarUrl, setAvatarUrl] = useState<any>();
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
        } else {
            return console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserDataFromDoc();
    }, []);

    return (
        <Drawer
            anchor="left"
            open={menuOpen}
            onClose={closeMenu}
        >
            <List className='menu'>
                <ListItem>
                    <Card sx={{maxWidth: '300px'}}>
                        <CardHeader
                            avatar={<Avatar alt='User' src={avatarUrl}/>}
                            title={`${data?.firstName} ${data?.lastName}`}
                            subheader={'online'}
                        />
                    </Card>
                    <Divider/>
                </ListItem>
                {MenuData.map(item => {
                    if (item.path !== '/messages') {
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
                    } else {
                        return (
                            <ListItem key={item.path}>
                                <Button
                                    sx={{width:'100%'}}
                                    onClick={() => {
                                        navigate(item.path);
                                        closeMenu();
                                    }}>
                                    <ListItemIcon>
                                        <Badge badgeContent={4} color="error">
                                            <MailIcon />
                                        </Badge>
                                    </ListItemIcon>
                                    <ListItemText primary={item.pageName}/>
                                </Button>
                            </ListItem>
                        )
                    }
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