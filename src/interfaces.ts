import {Dispatch, SetStateAction} from "react";

export interface INavbar {
    openMenu(): void;
}

export interface IPost {
    img?: string;
    alt?: string;
    description?: string;
    id?: number | undefined;
    remove?(id: number | undefined): void;
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
    posts: IPost[];
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

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;