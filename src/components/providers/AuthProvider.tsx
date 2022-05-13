import {createContext, Dispatch, FC, SetStateAction, useState, useEffect, useMemo} from "react";
import {IUser, TypeSetState} from "../../interfaces";
import {getAuth, onAuthStateChanged, Auth} from 'firebase/auth';
import {userData} from '../data/userData';
import {useNavigate} from "react-router-dom";

interface IContext {
    user: IUser | null;
    setUser: TypeSetState<IUser | null>;
    ga: Auth;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<IUser | null>(null);

    const ga = getAuth();

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
    })

    const values = useMemo(() => ({
        user,
        setUser,
        ga
    }), [user]);

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}