import React, {FC} from 'react';
import {
    Box,
    Container,
    Typography
} from "@mui/material";
import classes from '../../styles/messagePage.module.scss'
import Conversation from "./Conversation";

const MessagesPage:FC = () => {
    return (
        <Container sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Conversation/>
        </Container>
    );
};

export default MessagesPage;