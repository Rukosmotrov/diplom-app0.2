import React from 'react';
import {Container, Grid} from "@mui/material";
import classes from '../styles/loader.module.scss';

const Loader = () => {
    return (
        <Container>
            <Grid container sx={{h: window.innerHeight - 50,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <Grid container sx={{
                    width: '100px',
                    background:'red',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                    <div className={classes.ldsRing}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Loader;