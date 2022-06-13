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
  apiKey: "AIzaSyDpSOBrs21oi0L6-N2XGod6F6-HQ_7qZo4",
  authDomain: "diplom-app-a5ff8.firebaseapp.com",
  projectId: "diplom-app-a5ff8",
  storageBucket: "diplom-app-a5ff8.appspot.com",
  messagingSenderId: "1097243595016",
  appId: "1:1097243595016:web:617e375c445621739edcbd",
  measurementId: "G-NZHV95EG7P"
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