import {FC, useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {useAuth} from "../providers/useAuth";
import {IUserInfo} from "../../interfaces";


export const useImportUserData = async () => {
    const {user, db} = useAuth();
    // const [data, setData] = useState<any>({
    //     firstName: '',
    //     lastName: '',
    //     cityOfResidence: '',
    //     countryOfBirth: '',
    //     birthDate: '',
    //     avatar: '39013212.jpg',
    //     bgImg: 'https://cdn.pixabay.com/photo/2020/08/02/14/18/blue-5457731_960_720.jpg',
    //     email: user?.email
    // });
    const [data, setData] = useState<IUserInfo | any>();

    const getUserDataFromDoc = async () => {
        const docRef = doc(db, `${user?.email}`, "userData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data());
            console.log('Йобана data: ', data);
        } else {
            console.log("No such document!");
        }
    }

    /*useEffect(() => {
        getUserDataFromDoc();
    }, []);*/
    return data;
}