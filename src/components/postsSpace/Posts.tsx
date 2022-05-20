import React, {FC, useState, useEffect} from 'react';
import {Box, Card, CardHeader, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {IPost} from "../../interfaces";
import PostList from "./PostList";
import CreatePost from "../postsSpace/CreatePost";
import {onSnapshot, doc, collection, getDoc, addDoc, updateDoc, setDoc} from 'firebase/firestore';
import {useAuth} from "../providers/useAuth";

const Posts:FC = () => {
    const [isPostCreating, setPostCreating] = useState(false);
    const [posts, setPosts] = useState<IPost[]>([]);
    const {db} = useAuth();

    const addPost = (newPost: IPost) => {
        setPosts([newPost, ...posts]);
    }

    const removePost = (id: number) => {
        setPosts(prev => prev.filter(item => item.id !== id));
    }

    const addPostToDoc = async () => {
        if (posts.length > 1) {
            const postDocRef = doc(db, "user", "posts");
            await updateDoc(postDocRef, {
                posts: posts
            });
        } else {
            await setDoc(doc(db, "user", "posts"), {
                posts: posts
            });
        }
    }

    useEffect( () => {
        if (posts.length > 0) {
            addPostToDoc();
            console.log('Posts: ', posts);
        }
    }, [posts]);

    return (
        <Box sx={{top:'5rem'}}>
            <Card sx={{mt:5, mb:5}}>
                <CardHeader
                    title={'Publications'}
                />
            </Card>
            <Card sx={{mt:5, mb:5}}>
                <CardHeader
                    title={'Create post'}
                    action={
                        <IconButton aria-label='create post' onClick={() => setPostCreating(true)}>
                            <AddIcon/>
                        </IconButton>
                    }
                />
            </Card>
            <PostList posts={posts} onRemove={removePost}/>
            <CreatePost
                postCreating={isPostCreating}
                setPostCreating={setPostCreating}
                endCreating={() => setPostCreating(false)}
                addPost={addPost}
                posts={posts}
            />
        </Box>
    );
};

export default Posts;