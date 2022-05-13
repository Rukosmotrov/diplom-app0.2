import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createTheme, ThemeProvider} from "@mui/material";
import Main from "./Main";
import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {AuthProvider} from "./components/providers/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

firebase.initializeApp({
  apiKey: "AIzaSyBK-oFPxXVWYn7Or8BY4F4tCETnSQWAdH0",
  authDomain: "diplom-app-34192.firebaseapp.com",
  projectId: "diplom-app-34192",
  storageBucket: "diplom-app-34192.appspot.com",
  messagingSenderId: "217515009857",
  appId: "1:217515009857:web:d8f4a6032a0d0d5f0963c0",
  measurementId: "G-QBYKM42CYQ"
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#244d61'
    },
    secondary: {
      main: '#eaebed'
    }
  }
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Main/>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);