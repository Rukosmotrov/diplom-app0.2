import {createContext, Dispatch, FC, SetStateAction, useState, useEffect, useMemo} from "react";
import {IAuthContext, IUser, TypeSetState} from "../../interfaces";
import {getAuth, onAuthStateChanged, Auth} from 'firebase/auth';
import {getFirestore, Firestore} from 'firebase/firestore'
import {userData} from '../data/userData';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<IUser | null>(null);

    const ga = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const unListen = onAuthStateChanged(ga, authUser => {
            if (authUser) {
                setUser({
                    _id: authUser.uid,
                    avatar: userData.avatar || '',
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                });
            } else {
                setUser(null);
            }
        })
        return () => {
            unListen();
        }
    }, [])

    const values = useMemo(() => ({
        user,
        setUser,
        ga,
        db
    }), [user]);

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}