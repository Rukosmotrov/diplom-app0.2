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
import {IPost, IUserInfo} from "../../../../interfaces";
import {useAuth} from "../../../providers/useAuth";
import {doc, getDoc} from "firebase/firestore";
import {getDownloadURL, getStorage, ref} from "firebase/storage";

const SearchedUserPost:FC<IPost> = ({
                            img,
                            alt,
                            description,
                            id,
                            time,
                            author,
                            user
                        }) => {
    const {db} = useAuth();
    const [data, setData] = useState<IUserInfo>();
    const [avatarUrl, setAvatarUrl] = useState<any>();
    const [imgUrl, setImgUrl] = useState<any>();
    const storage = getStorage();

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${user.currentUser.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data().data);
            const avatarRef = ref(storage, `${user.currentUser.email}/images/${docSnap.data().data.avatar}`);
            getDownloadURL(avatarRef)
                .then((url) => {
                    setAvatarUrl(url);
                });
            const imageRef = ref(storage, `${user.currentUser.email}/images/${img}`);
            getDownloadURL(imageRef)
                .then((url) => {
                    setImgUrl(url);
                });
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
                    avatar={<Avatar src={avatarUrl}/>}
                    title={`${data?.firstName} ${data?.lastName}`}
                    subheader={time}
                />
                {img !== ''
                    ?
                    <>
                        <CardMedia
                            component="img"
                            height="300"
                            image={imgUrl}
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

export default SearchedUserPost;