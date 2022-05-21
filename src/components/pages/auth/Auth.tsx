import React, {FC, SyntheticEvent, useState, useRef, useEffect} from 'react';
import {TextField, ButtonGroup, Button, Box, Divider, Alert} from "@mui/material";
import {IUserData} from "../../../interfaces";
import classes from '../../styles/authPage.module.scss';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {useAuth} from "../../providers/useAuth";
import {useNavigate} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore";

const Auth:FC = () => {
    const {ga, user, db} = useAuth();
    const [isRegForm, setIsRegForm] = useState(false);
    const [isRegError, setRegError] = useState(false);
    const regError = useRef('');
    const [userData, setUserData] = useState<IUserData>({email:'', password:''} as IUserData);
    const navigate = useNavigate();

    const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isRegForm){
            try {
                await createUserWithEmailAndPassword(ga, userData.email, userData.password);
                await setDoc(doc(db, "user", "posts"), {
                    posts: []
                });
            } catch (error:any) {
                error.message && console.log(error.message);
                setRegError(true);
                setTimeout(() => setRegError(true), 1500);
                regError.current = error.message;
            }
        } else {
            try {
                await signInWithEmailAndPassword(ga, userData.email, userData.password);
            } catch (error:any) {
                error.message && console.log(error.message);
                setRegError(true);
                setTimeout(() => setRegError(true), 1500);
                regError.current = error.message;
            }
        }
        setUserData({email:'', password:''});
    }

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    return (
        <>
            {isRegError && <Alert severity="error" sx={{m:'1rem 0'}}>{regError.current}</Alert>}
            <Box className={classes.authBox}>
                <form onSubmit={handleLogin} className={classes.authForm}>
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
                        label='Password'
                        variant='outlined'
                        value={userData.password}
                        onChange={e => setUserData( {...userData, password: e.target.value})}
                        required
                    />
                    <br/><br/>
                    <ButtonGroup variant='text' sx={{display:'flex', justifyContent:'center'}}>
                        <Button type='submit' onClick={() => setIsRegForm(false)}>Log in</Button>
                        <Button type='submit' onClick={() => setIsRegForm(true)}>Sign in</Button>
                    </ButtonGroup>
                </form>
            </Box>
        </>
    );
};

export default Auth;