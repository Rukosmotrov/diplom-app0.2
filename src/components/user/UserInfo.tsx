import React, {FC} from 'react';
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
import SchoolIcon from '@mui/icons-material/School';
import {userData} from '../data/userData';

const UserInfo:FC = () => {
    const data = userData;
    return (
        <Grid container spacing={5} direction='row'>
            <Grid item xs={3}>
                <Card className='avatar' sx={{p:1}}>
                    <CardMedia
                        component='img'
                        height='280px'
                        image={data.avatar}
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
                                <ListItemText primary={`Living in: ${data.livingIn}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`Born in: ${data.bornIn}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ChildFriendlyIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`Birth date: ${data.birthDate}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <SchoolIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`Studies in: ${data.studiesIn}`}/>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserInfo;