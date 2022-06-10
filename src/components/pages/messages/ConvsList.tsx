import React from 'react';
import {
    Avatar,
    Typography, Box
} from "@mui/material";

const ConvsList = () => {
    return (
        <Box
            sx={{
                width: 'auto',
                flexShrink: 0,
                height: 'calc(70vh + 90px)',
                backgroundColor:'#eaebed',
                border: '5px solid #244d61',
                paddingLeft:'15px',
                mt:'10px',
                borderRadius: '16px 0 0 16px'
            }}

        >
            <Box sx={{
                display:'flex',
                alignItems:'center',
                width:'80%',
                height:'35px',
                backgroundColor:'#244d61',
                padding:'10px',
                borderRadius:'16px',
                mt:'20px'
            }}>
                <Avatar alt='Chat' src=''/>
                <Typography
                sx={{backgroundColor:'#eaebed',
                    p:'5px 10px',
                    m:'5px',
                    width:'80%',
                    fontSize:'14px',
                    borderRadius:'16px'
                }}>
                Здарова
                </Typography>
            </Box>
            <Box sx={{
                display:'flex',
                alignItems:'center',
                width:'80%',
                height:'35px',
                backgroundColor:'#244d61',
                padding:'10px',
                borderRadius:'16px',
                mt:'20px'
            }}>
                <Avatar alt='Chat' src=''/>
                <Typography
                    sx={{backgroundColor:'#eaebed',
                        p:'5px 10px',
                        m:'5px',
                        width:'80%',
                        fontSize:'14px',
                        borderRadius:'16px'
                    }}>
                    Шо ти?
                </Typography>
            </Box>
            <Box sx={{
                display:'flex',
                alignItems:'center',
                width:'80%',
                height:'35px',
                backgroundColor:'#244d61',
                padding:'10px',
                borderRadius:'16px',
                mt:'20px'
            }}>
                <Avatar alt='Chat' src=''/>
                <Typography
                    sx={{backgroundColor:'#eaebed',
                        p:'5px 10px',
                        m:'5px',
                        width:'80%',
                        fontSize:'14px',
                        borderRadius:'16px'
                    }}>
                    Голова
                </Typography>
            </Box>
        </Box>
    );
};

export default ConvsList;