import React, {FC} from 'react';
import {IPostListProps} from "../../interfaces";
import Post from "./Post";
import {Grid, Typography} from "@mui/material";

const PostList:FC<IPostListProps> = ({posts, onRemove}) => {
    return (
        <>
            {posts.length > 0
                ?
                <Grid container spacing={5} direction="column">
                    {
                        posts.map(post => {
                            return <Post
                                key={post.id}
                                id={post.id}
                                img={post.img}
                                alt='Post image'
                                description={post.description}
                                remove={onRemove}
                            />
                        })
                    }
                </Grid>
                :
                <Typography variant='h5'>There is no posts</Typography>
            }
        </>
    );
};

export default PostList;