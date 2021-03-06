import React, {FC, SyntheticEvent, useState, useRef, useEffect} from 'react';
import {TextField, ButtonGroup, Button, Box, Alert} from "@mui/material";
import {IUserData, IUserInfo} from "../../../interfaces";
import classes from '../../styles/authPage.module.scss';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useAuth} from "../../providers/useAuth";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import {doc, getDoc, updateDoc} from "firebase/firestore";


const SignInPage:FC = () => {
    const {ga, db} = useAuth();
    const [isRegError, setRegError] = useState(false);
    const regError = useRef('');
    const [userData, setUserData] = useState<IUserData>({email:'', password:''} as IUserData);
    const navigate = useNavigate();

    const handleSignIn = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const docRef = doc(db, `${userData.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await signInWithEmailAndPassword(ga, userData.email, userData.password);
            await updateDoc(docRef, {
                data: {
                    ...docSnap.data()?.data,
                    isInNetwork: 'online'
                }
            });
        } else {
            console.log('');
        }
        setUserData({email:'', password:''});
        navigate('/home');
    }

    return (
        <>
            <Navbar/>
            {isRegError && <Alert severity="error" sx={{m:'1rem 0'}}>{regError.current}</Alert>}
            <Box className={classes.authBox}>
                <form onSubmit={handleSignIn} className={classes.authForm}>
                    <TextField
                        type='email'
                        label='Email'
                        variant='outlined'
                        value={userData.email}
                        onChange={e => setUserData( {...userData, email: e.target.value})}
                        required
                    />
                    <br/><br/>
                    <TextField
                        type='password'
                        label='????????????'
                        variant='outlined'
                        value={userData.password}
                        onChange={e => setUserData( {...userData, password: e.target.value})}
                        required
                    />
                    <br/><br/>
                    <ButtonGroup variant='text' sx={{display:'flex', justifyContent:'space-between'}}>
                        <Button type='submit' variant='contained'>????????</Button>
                        <Button onClick={() => navigate('/sign-up')}>????????????????????</Button>
                    </ButtonGroup>
                </form>
            </Box>
        </>
    );
};

export default SignInPage;