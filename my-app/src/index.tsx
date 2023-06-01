import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./Components/Routes/AppRoutes";
import* as firebase from "firebase/app";
import {AuthProvider} from "./Components/Provider/ProviderAuth";

firebase.initializeApp({
    apiKey: "AIzaSyDGfZXUvF-pK9U2FRMwv65xdZcTx0mvpuc",
    authDomain: "musicsotialapp.firebaseapp.com",
    projectId: "musicsotialapp",
    storageBucket: "musicsotialapp.appspot.com",
    messagingSenderId: "38305401937",
    appId: "1:38305401937:web:522387d679f1313ea37c70"
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    </BrowserRouter>
);

