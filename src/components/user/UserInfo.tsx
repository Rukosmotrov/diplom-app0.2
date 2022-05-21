import React, {FC, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardMedia,
    Divider,
    Grid,
    CardHeader,
    CardContent,
    Typography, CardActions, ListItem, List, ListItemIcon, ListItemText
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {INeedData} from "../../interfaces";

const UserInfo:FC<INeedData> = ({data}) => {
    return (
        <Grid container spacing={5} direction='row'>
            <Grid item xs={3}>
                <Card className='avatar' sx={{p:1}}>
                    <CardMedia
                        component='img'
                        height='280px'
                        image='39013212.jpg'
                    />
                    <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
                        <Button variant='contained' sx={{mt:2, width:'100px'}}>Follow</Button>
                        <Button variant='contained' sx={{mt:2, width:'100px'}}>Message</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={9}>
                <Card sx={{p:1, height: '350px'}}>
                    <CardContent>
                        <Typography variant={'h5'}>{`${data.firstName} ${data.lastName}`}</Typography>
                        <Divider/>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`Living in: ${data.cityOfResidence}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`Born in: ${data.countryOfBirth}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ChildFriendlyIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`Birth date: ${data.birthDate}`}/>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserInfo;