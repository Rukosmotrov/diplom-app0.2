import React, {FC, useEffect, useState} from 'react';
import {Box, Typography, Container, Card, Grid} from "@mui/material";
import classes from '../../styles/news.module.scss'
import Navbar from "../../navbar/Navbar";
import Menu from "../../menu/Menu";
import {useAuth} from "../../providers/useAuth";
import {getStorage} from "firebase/storage";
import {doc, getDoc} from "firebase/firestore";
import News from "./News";

const NewsPage:FC = () => {
    const {db, user} = useAuth();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [news, setNews] = useState<any>([]);

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            docSnap.data().data.subscribes.map( async (item: any) => {
                const newsDocRef = doc(db, `${item.email}`, "posts");
                const newsDocSnap = await getDoc(newsDocRef);
                if (newsDocSnap.exists()) {
                    setNews([...news, ...newsDocSnap.data().posts]);
                } else {
                    return console.log('No news: ', news);
                }
            });
        } else {
            return console.log("No such document!");
        }
    }

    useEffect(() => {
        getUserDataFromDoc();
    }, []);
    return (
        <Container className={classes.newsBox}>
            <Navbar openMenu={() => setMenuOpen(true)}/>
            <Card sx={{p: 2, mb: 5}}>
                <Typography variant='h5'>
                    Новини
                </Typography>
            </Card>
            <Grid container direction='column'>
                {news.map((item: any) =>{
                    console.log('Avatar: ', item.author.avatar)
                    return(
                        <News
                            avatar={item.author.avatar}
                            img={item.img}
                            time={item.time}
                            alt={'News'}
                            description={item.description}
                            email={item.author.email}
                        />
                    )
                })}
            </Grid>
            <Menu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)}/>
        </Container>
    );
};

export default NewsPage;