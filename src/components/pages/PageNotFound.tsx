import React, {useState} from 'react';
import {Typography} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Menu from "../menu/Menu";

const PageNotFound = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <div>
            <Navbar openMenu={() => setMenuOpen(true)}/>
            <Typography
                variant='h3'
                color='error'
                style={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >Page not found</Typography>
            <Menu menuOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)}/>
        </div>
    );
};

export default PageNotFound;