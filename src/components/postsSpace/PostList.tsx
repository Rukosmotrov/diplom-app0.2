import React, {FC, useEffect, useState} from 'react';
import {IPost, IPostListProps} from "../../interfaces";
import Post from "./Post";
import {Grid, Typography} from "@mui/material";
import {useAuth} from "../providers/useAuth";
import {doc, getDoc} from "firebase/firestore";

const PostList:FC<IPostListProps> = ({posts, onRemove}) => {
    const {db} = useAuth();
    //const [postsData, setPostsData] = useState<IPost[]>([]);
    const postsData: any = [];

    const getPostsFromDoc = async () => {
        const docRef = doc(db, "user", "posts");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            docSnap.data().posts.map((d: any) => {
               postsData.push(d);
                //console.log('D: ', d);
            })
            // setPostsData([docSnap.data().posts]);
            console.log('postsData: ', postsData);
        } else {
           return console.log("No such document!");
        }
    }

    useEffect(() => {
        getPostsFromDoc()
        postsData.map((d: any) => {
            console.log('d: ', d);
        })
    }, []);

    // if (docSnap.exists()) {
    //     docSnap.data().posts.map((d: any) => {
    //         setPosts(prev => [prev, d]);
    //         console.log("D: ", d);
    //     })
    // } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    // }

    return (
        <>
            {posts.length > 0
                ?
                <Grid container spacing={5} direction="column">
                    {
                        postsData.map((d: any) => {
                            return <Post
                                key={d.id}
                                id={d.id}
                                img={d.img}
                                alt='Post image'
                                description={d.description}
                                remove={onRemove}
                                author={d.author}
                            />
                        })
                        // posts.map(post => {
                        //     return <Post
                        //         key={post.id}
                        //         id={post.id}
                        //         img={post.img}
                        //         alt='Post image'
                        //         description={post.description}
                        //         remove={onRemove}
                        //         author={user}
                        //     />
                        // })
                    }
                </Grid>
                :
                <Typography variant='h5'>There is no posts</Typography>
            }
        </>
    );
};

export default PostList;