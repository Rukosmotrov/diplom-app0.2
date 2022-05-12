import React, {FC, useContext} from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Divider,
    Grid,
    IconButton,
    SpeedDial, SpeedDialAction,
    Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from '@mui/icons-material/Close';
import {IPost} from "../../interfaces";
import {userData} from '../data/userData'

const Post:FC<IPost> = ({img, alt, description, remove, id}) => {
    const date = new Date();
    const time = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    return (
        <Grid item>
            <Card>
                <CardHeader
                    avatar={<Avatar src={userData.avatar}/>}
                    title={`${userData.firstName} ${userData.lastName}`}
                    subheader={time}
                    action={
                        <IconButton aria-label="settings" onClick={() => remove ? remove(id) : remove}>
                            <CloseIcon/>
                        </IconButton>
                    }
                />
                {img !== ''
                    ?
                    <>
                        <CardMedia
                            component="img"
                            height="300"
                            image={img}
                            alt={alt}
                        />
                        <Typography sx={{p:2}}>{description}</Typography>
                    </>
                    :
                    <Typography sx={{p:2}}>{description}</Typography>
                }
                <Divider/>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="add to favorites">
                        <CommentIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Post;