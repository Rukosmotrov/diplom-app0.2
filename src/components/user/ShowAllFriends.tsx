import React, {FC} from 'react';
import {Button, Card, CardHeader} from "@mui/material";

const ShowAllFriends:FC = () => {
    return (
        <Card className='card' sx={{mt:5, mb:5, p:2}}>
            <CardHeader
                title={'Friends'}
            />
            <Button>All friends</Button>
        </Card>
    );
};

export default ShowAllFriends;