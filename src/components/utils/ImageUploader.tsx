import React, {useEffect, useRef, useState, FC} from 'react';
import {Alert, Box, Button, Modal, Typography, Divider} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {IImageUploader} from '../../interfaces'

const ImageUploader:FC<IImageUploader> = ({isOpen, closeModal, changer}) => {
    const [imageDrag, setImageDrag] = useState(false);
    const [imageDropped, setImageDropped] = useState(false);
    const [isError, setError] = useState(false);
    const errorText = useRef('');
    const image = useRef('');

    function dragStartHandler(e :any) {
        e.preventDefault();
        setImageDrag(true);
    }
    function dragLeaveHandler(e :any) {
        e.preventDefault();
        setImageDrag(false);
    }
    function onDropHandler(e: any) {
        e.preventDefault();
        let file = e.dataTransfer.files[0].name;
        let fileType =  file.split(".").splice(-1,1)[0];
        if (fileType === 'bmp' || fileType === 'jpeg' || fileType === 'png' || fileType === 'tif' || fileType === 'tiff' || fileType === 'jpg') {
            image.current = file;
        } else {
            errorText.current = 'Incorrect type of file';
            setError(true);
            setTimeout(() => {
                setError(false);
                setImageDropped(false);
            }, 1500)
        }
        setImageDropped(true);
    }

    useEffect(() => {
        if(!isOpen){
            setImageDropped(false);
            setError(false);
        }
    }, [isOpen]);

    const uploadImage = () => {
        if (image.current === ''){
            return;
        } else{
            if (changer) {
                changer(image.current);
                closeModal();
            }
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                        >Drag the file</Box>
                    }
                </Box>
                <Divider/>
                <Button onClick={uploadImage}>Submit</Button>
                {isError
                    ? <Alert severity="error">{errorText.current}</Alert>
                    : <Alert severity="info">Import an image and/or write description to create the post</Alert>
                }
            </Box>
        </Modal>
    );
};

export default ImageUploader;