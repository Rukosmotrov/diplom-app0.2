import React from 'react';
import {Typography} from "@mui/material";

const PageNotFound = () => {
    return (
        <div>
            <Typography
                variant='h3'
                color='error'
                style={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >Page not found</Typography>
        </div>
    );
};

export default PageNotFound;