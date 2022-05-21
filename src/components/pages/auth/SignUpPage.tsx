import React, {FC, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Alert, Box, Button, ButtonGroup, Grid, Modal, TextField} from "@mui/material";
import {IUserData, IUserInfo} from "../../../interfaces";
import classes from '../../styles/authPage.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../providers/useAuth";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';

const SignUpPage:FC = () => {
    const navigate = useNavigate();
    const {ga, db} = useAuth();
    const [isRegError, setRegError] = useState(false);
    const regError = useRef('');
    const [userData, setUserData] = useState<IUserData>({email:'', password:''} as IUserData);
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        firstName: '',
        lastName: '',
        birthDate: '',
        countryOfBirth: '',
        countryOfResidence: '',
        cityOfResidence: '',
    } as IUserInfo);

    const handleSignUp = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(ga, userData.email, userData.password);
            await setDoc(doc(db, userData.email, "posts"), {
                posts: []
            });
            await setDoc(doc(db, userData.email, "userData"), {
                email: userData.email,
                password: userData.password,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                birthDate: userInfo.birthDate,
                countryOfBirth: userInfo.countryOfBirth,
                countryOfResidence: userInfo.countryOfResidence,
                cityOfResidence: userInfo.cityOfResidence
            });
        } catch (error:any) {
            error.message && console.log(error.message);
            setRegError(true);
            setTimeout(() => setRegError(true), 1500);
            regError.current = error.message;
        }
        navigate('/');
    }

    return (
        <>
            {isRegError && <Alert severity="error" sx={{m:'1rem 0'}}>{regError.current}</Alert>}
            <Box className={classes.authBox}>
                <form onSubmit={handleSignUp} className={classes.settingBox}>
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
                    <TextField
                        type='text'
                        label='First name'
                        variant='outlined'
                        value={userInfo.firstName}
                        onChange={e => {setUserInfo({...userInfo, firstName: e.target.value})}}
                        required
                    />
                    <br/><br/>
                    <TextField
                        type='text'
                        label='Last name'
                        variant='outlined'
                        value={userInfo.lastName}
                        onChange={e => {setUserInfo({...userInfo, lastName: e.target.value})}}
                        required
                    />
                    <br/><br/>
                    <TextField
                        type='date'
                        label='Date of birth'
                        variant='outlined'
                        value={userInfo.birthDate}
                        onChange={e => {setUserInfo({...userInfo, birthDate: e.target.value})}}
                        required
                    />
                    <br/><br/>
                    <TextField
                        type='text'
                        label='Country of birth'
                        variant='outlined'
                        value={userInfo.countryOfBirth}
                        onChange={e => {setUserInfo({...userInfo, countryOfBirth: e.target.value})}}
                    />
                    <br/><br/>
                    <TextField
                        type='text'
                        label='Country of residence'
                        variant='outlined'
                        value={userInfo.countryOfResidence}
                        onChange={e => {setUserInfo({...userInfo, countryOfResidence: e.target.value})}}
                    />
                    <br/><br/>
                    <TextField
                        type='text'
                        label='City of residence'
                        variant='outlined'
                        value={userInfo.cityOfResidence}
                        onChange={e => {setUserInfo({...userInfo, cityOfResidence: e.target.value})}}
                    />
                    <br/><br/>
                    <ButtonGroup variant='text' sx={{display:'flex', justifyContent:'center'}}>
                        <Button type='submit'>Sign up</Button>
                    </ButtonGroup>
                </form>
                <Link to='/sign-in'>Sign in</Link>
            </Box>
        </>
    );
};

export default SignUpPage;