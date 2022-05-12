import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createTheme, ThemeProvider} from "@mui/material";
import Main from "./Main";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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
      <Main/>
    </ThemeProvider>
  </React.StrictMode>
);