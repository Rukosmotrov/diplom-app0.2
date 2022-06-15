import React, {FC, useEffect, useRef, useState, KeyboardEvent, DragEvent} from 'react';
import {ICreatingPost} from "../../interfaces";
import {Box, Modal, Typography, TextareaAutosize, Button, Alert, Divider} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {useAuth} from "../providers/useAuth";

const CreatePost:FC<ICreatingPost> = ({postCreating, endCreating, addPost, setPostCreating, posts}) => {
    const {db, user} = useAuth();
    const [imageDrag, setImageDrag] = useState(false);
    const [imageDropped, setImageDropped] = useState(false);
    const [post, setPost] = useState({img: '', description: ''});
    const [isError, setError] = useState(false);
    const errorText = useRef('');

    function dragStartHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setImageDrag(true);
    }
    function dragLeaveHandler(e :DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setImageDrag(false);
    }
    function onDropHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        let file = e.dataTransfer.files[0];
        let fileType =  file.name.split(".").splice(-1,1)[0];
        if (fileType === 'bmp' || fileType === 'jpeg' || fileType === 'png' || fileType === 'tif' || fileType === 'tiff' || fileType === 'jpg') {
            setPost({...post, img: file.name});
        } else {
            errorText.current = 'Невірний тип файлу';
            setError(true);
            setTimeout(() => {
                setError(false);
                setImageDropped(false);
            }, 1500)
        }
        setImageDropped(true);
    }

    const onClickChooseImage = (e :any) => {
        let file = e.target.files[0];
        let fileType =  file.name.split(".").splice(-1,1)[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            if (fileType === 'bmp' || fileType === 'jpeg' || fileType === 'png' || fileType === 'tif' || fileType === 'tiff' || fileType === 'jpg') {
                setPost({...post, img: file.name});
                setImageDropped(true);
            } else {
                errorText.current = 'Невірний тип файлу';
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setImageDropped(false);
                }, 1500)
            }
        }
    }

    useEffect(() => {
        if(!postCreating){
            setImageDropped(false);
            setError(false);
        }
    }, [postCreating]);

    const date = new Date();
    const time = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    const addNewPost =  () => {
        const newPost = {
            ...post,
            id: Date.now(),
            author: user,
            time: time
        };
        if (post.img !== '' || post.description !== '' && user){
            addPost(newPost);
            setPost({img:'', description:''});
            setPostCreating(false);
        } else{
            errorText.current = 'Missing value';
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1500)
        }
    };

    const addWithEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewPost();
        }
    }

    return (
        <Modal
            open={postCreating}
            onClose={endCreating}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onKeyDown={addWithEnter}
        >
            <Box className='modal'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Post creating
                </Typography>
                <Box id="modal-modal-description">
                    <p>Import image:  </p>
                    {imageDrag
                        ? <Box
                            className='image-drop-area'
                            onDragStart={e => dragStartHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragOver={e => dragStartHandler(e)}
                            onDrop={e => onDropHandler(e)}
                        >{imageDropped && isError ? <CloseIcon color='error'/> : imageDropped ? <DoneIcon color='success'/> : 'Drop the file'}</Box>
                        : <Box
                            className='image-drop-area'
                            onDragStart={e => dragStartHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragOver={e => dragStartHandler(e)}
                        ><input onChange={onClickChooseImage} type='file'/>Drag the file</Box>
                    }
                </Box>
                <Box id="modal-modal-description">
                    <p>Add description:  </p>
                        <TextareaAutosize
                            id='description'
                            maxRows={4}
                            style={{ width: 400, height:50, padding:10, fontFamily: "inherit" }}
                            value={post.description}
                            onChange={e => setPost({...post, description: e.target.value})}
                        />
                </Box>
                <Divider/>
                <Button onClick={addNewPost}>Create</Button>
                {isError
                    ? <Alert severity="error">{errorText.current}</Alert>
                    : <Alert severity="info">Import an image and/or write description to create the post</Alert>
                }
            </Box>
        </Modal>
    );
};

export default CreatePost;