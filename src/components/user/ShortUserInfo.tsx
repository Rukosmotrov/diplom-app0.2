import React, {FC, useEffect, useState} from 'react';
import {Card, CardHeader, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import {IUserInfo} from "../../interfaces";
import {useAuth} from "../providers/useAuth";
import {doc, getDoc} from "firebase/firestore";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ShortUserInfo:FC = () => {
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
    return (
            <Card className='card' sx={{mt:5, p:2}}>
                <CardHeader
                    title={'Коротка інформація'}
                />
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Місто: ${data?.cityOfResidence}`}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LocationOnIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Країна народження: ${data?.countryOfBirth}`}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ChildFriendlyIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Дата народження: ${data?.birthDate}`}/>
                    </ListItem>
                </List>
            </Card>
    );
};

export default ShortUserInfo;