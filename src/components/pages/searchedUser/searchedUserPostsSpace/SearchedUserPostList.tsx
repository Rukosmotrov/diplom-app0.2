import React, {FC, useEffect, useRef, useState} from 'react';
import {IPost, IPostListProps} from "../../../../interfaces";
import {Grid, Typography} from "@mui/material";
import SearchedUserPost from "./SearchedUserPost";

interface ISearchedPostListProps {
    posts: any;
}

const SearchedUserPostList:FC<ISearchedPostListProps> = ({posts}) => {

    return (
        <>
            {posts.length !== 0
                ?
                <Grid container spacing={5} direction="column">
                    {
                        posts.map((post: any) => {
                            return <SearchedUserPost
                                key={post.id}
                                id={post.id}
                                img={post.img}
                                alt='Post image'
                                description={post.description}
                                time={post.time}
                                author={post.author}
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

export default SearchedUserPostList;