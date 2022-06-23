import React, {FC, useEffect, useState} from 'react';
import {Avatar, Typography} from "@mui/material";
import Moment from "react-moment";
import classes from "./messenger.module.scss";
import {useAuth} from "../../providers/useAuth";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {doc, getDoc} from "firebase/firestore";

interface IMessage {
    message: any;
    currentUser: any;
}

const Message:FC<IMessage> = ({message, currentUser}) => {
    const {db, user} = useAuth();
    const storage = getStorage();
    const [avatarUrl, setAvatarUrl] = useState<any>();

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${message.from}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const avatarRef = ref(storage, `${message.from}/images/${docSnap.data().data.avatar}`);
            await getDownloadURL(avatarRef)
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
        <div className={`${classes.message_wrapper} ${message.from === currentUser.email ? classes.own : ''}`}>
            <p className={message.from === user?.email ? classes.me : classes.friend}>
                <Avatar src={avatarUrl} alt={'User'} sx={{width:'25px', height:'25px'}}/>
                <Typography sx={{color: '#262626'}}>{message.text}</Typography>
                <br/>
                <small>
                    <Moment fromNow>{message.createdAt.toDate()}</Moment>
                </small>
            </p>
        </div>
    );
};

export default Message;