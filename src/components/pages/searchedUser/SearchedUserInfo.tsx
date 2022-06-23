import React, {FC, useEffect, useState} from 'react';
import {
    Button,
    Card,
    Grid,
    Typography, CardActions, Avatar, Box
} from "@mui/material";
import {IUserInfo} from "../../../interfaces";
import {useAuth} from "../../providers/useAuth";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../../loader/Loader";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {useNavigate} from "react-router-dom";

const SearchedUserInfo:FC = () => {
    const {user, db, ga} = useAuth();
    const [currentUser, setCurrentUser] = useState<any>();
    const [data, setData] = useState<IUserInfo>();
    const [signedUserData, setSignedUserData] = useState<any>();
    const [usr, loading, error] = useAuthState(ga);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [searchedUserAvatarUrl, setSearchedUserAvatarUrl] = useState<any>();
    const [searchedUserBgImgUrl, setSearchedUserBgImgUrl] = useState<any>();
    const [signedSubs, setSignedSubs] = useState<any>([]);
    const [currentSubs, setCurrentSubs] = useState<any>([]);
    const [canUpload, setCanUpload] = useState<boolean>(false);
    const storage = getStorage();
    const navigate = useNavigate();

    const getCurrentUserFromDoc = async () => {
        const docRef = doc(db, "usersList", "currentUser");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setCurrentUser(docSnap.data().currentUser);
        } else {
            return console.log("No such document!");
        }
    }

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${currentUser?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data().data);
            setCurrentSubs(docSnap.data().data.subscribers)
            const searchedUserAvatarRef = ref(storage, `${currentUser?.email}/images/${docSnap.data().data.avatar}`);
            getDownloadURL(searchedUserAvatarRef)
                .then((url) => {
                    setSearchedUserAvatarUrl(url);
                });
            const searchedUserBgImgRef = ref(storage, `${currentUser?.email}/images/${docSnap.data().data.bgImg}`);
            getDownloadURL(searchedUserBgImgRef)
                .then((url) => {
                    setSearchedUserBgImgUrl(url);
                });
        } else {
            return console.log("No such document!");
        }
    }

    const getSignedUserDataFromDoc = async () => {
        const currentDocRef = doc(db, "usersList", "currentUser");
        const currentDocSnap = await getDoc(currentDocRef);
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setSignedUserData(docSnap.data().data);
            setSignedSubs(docSnap.data().data.subscribes);
            docSnap.data().data.subscribes.map((item: any) => {
                if (item.email === currentDocSnap.data()?.currentUser.email){
                    setIsSubscribed(true);
                }
            })
        } else {
            return console.log("No such document!");
        }
    }

    const subscribe = async () => {
        const docRef = doc(db, "usersList", "currentUser");
        const docSnap = await getDoc(docRef);
        const signedUserMessagesRef = doc(db, `${user?.email}`, "messages");
        const signedUserMessagesSnap = await getDoc(signedUserMessagesRef);
        const currentUserMessagesRef = doc(db, `${docSnap.data()?.currentUser.email}`, "messages");
        const currentUserMessagesSnap = await getDoc(currentUserMessagesRef);
        const currentDocRef = doc(db, `${docSnap.data()?.currentUser.email}`, "userData");
        const currentDocSnap = await getDoc(currentDocRef);
        const signedDocRef = doc(db, `${user?.email}`, "userData");
        const signedDocSnap = await getDoc(signedDocRef);
        await updateDoc(signedDocRef, {
            data: {...signedDocSnap.data()?.data,
                subscribes: [...signedDocSnap.data()?.data.subscribes, currentDocSnap.data()?.data]}
        });
        await updateDoc(currentDocRef, {
            data: {...currentDocSnap.data()?.data,
                subscribers: [...currentDocSnap.data()?.data.subscribers, signedDocSnap.data()?.data]}
        });
        await updateDoc(signedUserMessagesRef, {
            messages: [docSnap.data()?.currentUser.email, ...signedUserMessagesSnap.data()?.messages]
        });
        await updateDoc(currentUserMessagesRef, {
            messages: [user?.email, ...currentUserMessagesSnap.data()?.messages]
        });
        setIsSubscribed(true);
    }

    const unSubscribe = async () => {
        const docRef = doc(db, "usersList", "currentUser");
        const docSnap = await getDoc(docRef);
        const currentDocRef = doc(db, `${docSnap.data()?.currentUser.email}`, "userData");
        const currentDocSnap = await getDoc(currentDocRef);
        const signedDocRef = doc(db, `${user?.email}`, "userData");
        const signedDocSnap = await getDoc(signedDocRef);
        const signedUserMessagesRef = doc(db, `${user?.email}`, "messages");
        const signedUserMessagesSnap = await getDoc(signedUserMessagesRef);
        const currentUserMessagesRef = doc(db, `${docSnap.data()?.currentUser.email}`, "messages");
        const currentUserMessagesSnap = await getDoc(currentUserMessagesRef);
        if (docSnap.exists()) {
            setCurrentSubs( (prev: any) => prev.filter((item: any) => item.email !== signedDocSnap.data()?.data.email));
            setSignedSubs((prev: any) => prev.filter((item: any) => item.email !== currentDocSnap.data()?.data.email));
            updateDoc(signedDocRef, {
                data: {
                    ...signedDocSnap.data()?.data,
                    subscribes: signedDocSnap.data()?.data.subscribes.filter((item: any) => item.email !== currentDocSnap.data()?.data.email)
                }
            });
            updateDoc(currentDocRef, {
                data: {
                    ...currentDocSnap.data()?.data,
                    subscribers: currentDocSnap.data()?.data.subscribers.filter((item: any) => item.email !== signedDocSnap.data()?.data.email)
                }
            });
            updateDoc(signedUserMessagesRef, {
                messages: signedUserMessagesSnap.data()?.messages.filter((item:any) =>
                    item !== currentDocSnap.data()?.data.email)
            });
            updateDoc(currentUserMessagesRef, {
                messages: currentUserMessagesSnap.data()?.messages.filter((item:any) =>
                    item !== signedDocSnap.data()?.data.email)
            });
            setCanUpload(true);
            setIsSubscribed(false);
        } else {
            return console.log("No such document!");
        }
    }

    const updateDocs = async () => {
        const docRef = doc(db, "usersList", "currentUser");
        const docSnap = await getDoc(docRef);
        const currentDocRef = doc(db, `${docSnap.data()?.currentUser.email}`, "userData");
        const currentDocSnap = await getDoc(currentDocRef);
        const signedDocRef = doc(db, `${user?.email}`, "userData");
        const signedDocSnap = await getDoc(signedDocRef);
        const signedUserMessagesRef = doc(db, `${user?.email}`, "messages");
        const signedUserMessagesSnap = await getDoc(signedUserMessagesRef);
        const currentUserMessagesRef = doc(db, `${docSnap.data()?.currentUser.email}`, "messages");
        const currentUserMessagesSnap = await getDoc(currentUserMessagesRef);
        updateDoc(signedDocRef, {
            data: {
                ...signedDocSnap.data()?.data,
                subscribes: signedSubs
            }
        });
        updateDoc(currentDocRef, {
            data: {
                ...currentDocSnap.data()?.data,
                subscribers: currentSubs
            }
        });
    }

    useEffect(() => {
        getCurrentUserFromDoc()
            .then(getSignedUserDataFromDoc);
        console.log('Is sub: ', isSubscribed);
    }, []);

    useEffect(() => {
        getUserDataFromDoc();
    }, [currentUser]);

    // useEffect(() => {
    //     if (canUpload) {
    //         updateDocs();
    //     }
    // }, [isSubscribed]);

    if (loading) {
        return <Loader/>
    }

    return (
        <Grid container spacing={5} direction='row'>
            <Grid item xs={12}>
                <div className='user-header' style={{backgroundImage: `url(${searchedUserBgImgUrl ? searchedUserBgImgUrl : '/'+data?.bgImg})`}}>
                    <Avatar alt='User' src={searchedUserAvatarUrl} sx={{
                        position: 'relative',
                        width: '150px',
                        height: '150px',
                        border: '5px solid #eaebed',
                    }}/>
                </div>
                <Card className='user-header-bottom'>
                    <Typography variant={'h5'}>{`${data?.firstName} ${data?.lastName}`}</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row'}} >
                        <Button
                            sx={{width:'150px'}}
                            onClick={() => navigate(`/subscribers${data?.dateOfReg}`)}
                        >
                            {`Підписники: ${data?.subscribers.length}`}
                        </Button>
                        <Button
                            sx={{width:'150px'}}
                            onClick={() => navigate(`/subscribes${data?.dateOfReg}`)}
                        >
                            {`Підписки: ${data?.subscribes.length}`}
                        </Button>
                    </Box>
                    <CardActions>
                        <Button variant={isSubscribed ? 'outlined' : 'contained'}
                                onClick={isSubscribed ? unSubscribe : subscribe}
                                sx={{width:'150px', m:'0 20px'}}
                        >{isSubscribed ? 'Following' : 'Follow'}
                        </Button>
                        {isSubscribed &&
                        <Button
                            variant='contained'
                            sx={{width:'150px', m:'0 20px'}}
                            onClick={() => navigate('/messages')}
                        >Message</Button>
                        }
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SearchedUserInfo;