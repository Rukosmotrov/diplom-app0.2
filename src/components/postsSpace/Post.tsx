import React, {FC, useEffect, useState} from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Divider,
    Grid,
    IconButton, Link,
    Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from '@mui/icons-material/Close';
import {IPost, IUserInfo} from "../../interfaces";
import {useAuth} from "../providers/useAuth";
import {doc, getDoc} from "firebase/firestore";

const Post:FC<IPost> = ({
                            img,
                            alt,
                            description,
                            remove,
                            id,
                            time,
                            author
}) => {
    const {user, db} = useAuth();
    const [data, setData] = useState<IUserInfo>();

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
    }, []);

    return (
        <Grid item>
            <Card>
                    <CardHeader
                        avatar={<Link href='/profile'><Avatar src={data?.avatar}/></Link>}
                        title={<Link href='/profile' underline='none'>{`${data?.firstName} ${data?.lastName}`}</Link>}
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