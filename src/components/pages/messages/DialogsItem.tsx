import React, {FC, useEffect, useState} from 'react';
import classes from "./messenger.module.scss";
import {Avatar, Box, Typography} from "@mui/material";
import {addDoc, collection, doc, getDoc, onSnapshot, setDoc, Timestamp} from "firebase/firestore";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {useAuth} from "../../providers/useAuth";

interface IDialogItem {
    usr: any;
    selectUser(item: any): void
    chat: any;
}

const DialogsItem:FC<IDialogItem> = ({usr, selectUser, chat}) => {
    const {db, user} = useAuth();
    const storage = getStorage();
    const [avatarUrl, setAvatarUrl] = useState<any>();
    const [data, setData] = useState<any>('');
    const [userData, setUserData] = useState<any>([]);

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${usr}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserData(docSnap.data()?.data);
            const avatarRef = ref(storage, `${usr}/images/${docSnap.data().data.avatar}`);
            await getDownloadURL(avatarRef)
                .then((url) => {
                    setAvatarUrl(url);
                });
        } else {
            return console.log("No such document!");
        }
    }

    const getLastMessage = async () => {
        const docRef = doc(db, "usersList", "users");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await docSnap.data().list.map(async (item: any) => {
                if (item.email === user?.email) {
                    const id = parseInt(item.dateOfReg) > parseInt(userData.dateOfReg) ?
                        `${item.email}${usr}` : `${usr}${item.email}`;
                    onSnapshot(doc(db, 'lastMessage', id), (doc) => {
                        setData(doc.data());
                        console.log('Last Message', doc.data());
                    });
                }
            })
        } else {
            return console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserDataFromDoc();
        getLastMessage();
    }, []);

    return (
        <Box
            className={`${classes.dialog_item_wrapper} ${chat?.email === usr && classes.selected_user}`}
            onClick={() => selectUser(userData)}
        >
            <Box className={classes.dialog_item_info}>
                <Box className={classes.dialog_item_details}>
                    <Avatar src={avatarUrl} alt={`${usr}`}/>
                    <Typography sx={{ml:1}}>{`${userData.firstName} ${userData.lastName}`}</Typography>
                    {data?.from !== user?.email && data?.unread &&
                        <div className={classes.unread}></div>
                    }
                </Box>
            </Box>
            <div className={classes.truncate}>
                {data &&
                <p><strong>{data.from === user?.email ? 'Я: ' : null}</strong>{data.text}</p>
                }
            </div>
        </Box>
    );
};

export default DialogsItem;