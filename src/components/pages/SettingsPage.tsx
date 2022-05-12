import React, {FC, useState} from 'react';
import {
    Accordion,
    Button,
    Container,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import ImageUploader from "../utils/ImageUploader";
import {userData} from '../data/userData';
import {settingsData} from '../data/settingsData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SettingsPage:FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const changeAvatar = (newAvatar:string) => {
        userData.avatar = newAvatar
    }

    return (
        <Container sx={{p:5}}>
            <Typography variant={'h5'} sx={{mb:5}}>Settings</Typography>
            <Divider/>
            {settingsData.map(item => {
                return (
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    User settings
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Divider/>
                                <ListItem key={item.settingName}>
                                    <Button
                                        onClick={() => setModalOpen(true)}>
                                        <ListItemText primary={item.settingName}/>
                                        <ListItemIcon>
                                            <item.icon/>
                                        </ListItemIcon>
                                    </Button>
                                </ListItem>
                                <Divider/>
                            </AccordionDetails>
                        </Accordion>
                )
            })}
            <ImageUploader
                isOpen={isModalOpen}
                closeModal={() => setModalOpen(false)}
                changer={changeAvatar}
            />
        </Container>
    );
};

export default SettingsPage;