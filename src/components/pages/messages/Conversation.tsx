import React, {FC, useEffect, useState} from 'react';
import classes from '../../styles/conversation.module.scss'
import {IMessage, IUserInfo} from "../../../interfaces";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {useAuth} from "../../providers/useAuth";
import {Box, Typography, Grid, Button, TextField, Avatar} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";

const Conversation:FC = () => {
    const {db, user} = useAuth();
    const [data, setData] = useState<IUserInfo>();
    const [messages, setMessages] = useState<any>([]);
    const [value, setValue] = useState('');
    const date = new Date();

    const getMessagesFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "messages");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setMessages(docSnap.data().messages);
        } else {
            return console.log("No such document!");
        }
    }

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
        getMessagesFromDoc();
    }, []);

    const sendMessage = () => {
        setMessages([{
            author: user?.email,
            authorName: user?.firstName + ' ' + user?.lastName,
            text: value,
            createdAt: date
        }, ...messages]);
        setValue('');
    }

    const addMessageToDoc = async () => {
        const postDocRef = doc(db, `${user?.email}`, "messages");
        await updateDoc(postDocRef, {
            messages: messages
        });
    }

    useEffect(() => {
        if (messages.length > 0) {
            addMessageToDoc();
        }
    }, [messages]);
    return (
        <>
            <Grid container sx={{justifyContent:'center'}}>
                <Box className={classes.convBox}>
                    {messages.map((message: any) =>
                        <Box className={classes.message}>
                            <Grid container direction='row'>
                                <Avatar src={data?.avatar} alt='User'/>
                                <Box sx={{ml:'10px'}}>{message.text}</Box>
                            </Grid>
                        </Box>
                    )}
                </Box>
                <Box className={classes.inputBox}>
                    <Box className={classes.wrapper} sx={{m:1}}>
                        <input
                            type="text"
                            placeholder='Повідомлення'
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </Box>
                    <Button variant='outlined' className={classes.sendBtn} onClick={sendMessage} sx={{m:1}}><SendIcon/></Button>
                </Box>
                {/*<Grid container direction='row' className={classes.inputBox}>*/}
                {/*    <Grid item>*/}
                {/*        <Box className={classes.wrapper}>*/}
                {/*            <input*/}
                {/*                type="text"*/}
                {/*                placeholder='Повідомлення'*/}
                {/*                value={value}*/}
                {/*                onChange={e => setValue(e.target.value)}*/}
                {/*            />*/}
                {/*        </Box>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Button variant='outlined' className={classes.sendBtn} fullWidth onClick={sendMessage}><SendIcon/></Button>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                {/*<Grid container*/}
                {/*      direction='row'*/}
                {/*      className={classes.inputBox}*/}
                {/*>*/}
                {/*    <Grid item xs={11}>*/}
                {/*        <Box className={classes.wrapper}>*/}
                {/*            <input*/}
                {/*                type="text"*/}
                {/*                placeholder='Повідомлення'*/}
                {/*                value={value}*/}
                {/*                onChange={e => setValue(e.target.value)}*/}
                {/*            />*/}
                {/*        </Box>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={1}>*/}
                {/*        <Button variant='outlined' className={classes.sendBtn} fullWidth onClick={sendMessage}><SendIcon/></Button>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
            </Grid>
        </>
    );
};

export default Conversation;