import React, {FC} from 'react';
import {Card, CardHeader, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";

const ShortUserInfo:FC = () => {
    return (
            <Card className='card' sx={{mt:5, p:2}}>
                <CardHeader
                    title={'Short info'}
                />
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Living in: Zhytomyr'}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ChildFriendlyIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Born in: Zhytomyr'}/>
                    </ListItem>
                </List>
            </Card>
    );
};

export default ShortUserInfo;