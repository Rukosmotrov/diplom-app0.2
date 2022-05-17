import {Dispatch, SetStateAction} from "react";
import {Auth} from "firebase/auth";
import {Firestore} from "firebase/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

export interface INavbar {
    openMenu(): void;
}

export interface IPost {
    img?: string;
    alt?: string;
    description?: string;
    id?: number | undefined;
    remove?(id: number | undefined): void;
    time?: string;
    author?: IUser | null;
}

export interface IMenu {
    menuOpen: boolean;
    closeMenu(): void;
}

export interface ICreatingPost {
    postCreating: boolean;
    setPostCreating(postCreating: boolean): void;
    endCreating(): void;
    addPost(newPost: IPost): void;
    posts: IPost[];
}

export interface IPostListProps {
    posts: IPost[] | DocumentData[];
    onRemove(id: number): void;
}

export interface IImageUploader {
    isOpen: boolean;
    closeModal(): void;
    changer(image:string): void;
}

export interface IUserData {
    email: string;
    password: string;
}

export interface IUser {
    _id: string;
    avatar: string;
    bgImg?: string;
    firstName: string;
    lastName: string;
    isInNetwork?: boolean;
}

export interface IAuthContext {
    user: IUser | null;
    setUser: TypeSetState<IUser | null>;
    ga: Auth;
    db: Firestore;
}

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;