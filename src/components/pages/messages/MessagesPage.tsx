import React, {FC} from 'react';
import {
    Box,
    Container,
    Typography
} from "@mui/material";
import classes from '../../styles/messagePage.module.scss'

const MessagesPage:FC = () => {
    return (
        <Container sx={{display:'flex', justifyContent:'center'}}>
            <Typography variant='h3'>Messages</Typography>
        </Container>
    );
};

export default MessagesPage;