import React, {FC, useEffect, useState} from 'react';
import {useAuth} from "../../providers/useAuth";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {doc, getDoc} from "firebase/firestore";
import {
    Avatar,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Divider,
    Grid,
    IconButton,
    Link,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import {IUserInfo} from "../../../interfaces";

interface INews {
    avatar: string;
    time: string;
    img: string;
    alt: string;
    description: string;
    email: any;
}

const News:FC<INews> = ({img, description, alt, time, avatar, email}) => {
    const {db} = useAuth();
    const [data, setData] = useState<IUserInfo>();
    const [avatarUrl, setAvatarUrl] = useState<any>();
    const [imgUrl, setImgUrl] = useState<any>();
    const storage = getStorage();

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data().data);
            const avatarRef = ref(storage, `${email}/images/${avatar}`);
            getDownloadURL(avatarRef)
                .then((url) => {
                    setAvatarUrl(url);
                    console.log('Avatar: ', avatar);
                    console.log('Avatar url: ', url);
                });
            const imageRef = ref(storage, `${email}/images/${img}`);
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
        <Grid item sx={{display:'flex', justifyContent:'center'}}>
            <Card sx={{width: '60%'}}>
                <CardHeader
                    avatar={<Link href='/profile'><Avatar src={avatarUrl}/></Link>}
                    title={<Link href='/profile' underline='none'>{`${data?.firstName} ${data?.lastName}`}</Link>}
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

export default News;