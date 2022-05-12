import React from 'react';
import {
    Box,
    Container,
    Typography
} from "@mui/material";
import classes from '../styles/messagePage.module.scss'

const MessagesPage = () => {
    return (
        <Container sx={{display:'flex', justifyContent:'center'}}>
            <Box className={classes.messagesBox}>
                <Typography variant='h3'>Messages</Typography>
            </Box>
        </Container>
    );
};

export default MessagesPage;