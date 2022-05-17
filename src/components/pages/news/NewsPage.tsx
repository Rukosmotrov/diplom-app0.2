import React, {FC} from 'react';
import {Box, Typography, Container} from "@mui/material";
import classes from '../../styles/news.module.scss'

const NewsPage:FC = () => {
    return (
        <Container className={classes.newsBox}>
            <Typography variant={'h3'}>News page</Typography>
            <Box className={classes.news}>
                {'news'}
            </Box>
        </Container>
    );
};

export default NewsPage;