import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./Components/Routes/AppRoutes";
import* as firebase from "firebase/app";
import {AuthProvider} from "./Components/Provider/ProviderAuth";

firebase.initializeApp({
    apiKey: "AIzaSyCttnMPGdsavxOKMdb8Ff2OCXkeC6RvAYQ",
    authDomain: "sotial-app-2-0.firebaseapp.com",
    databaseURL: "https://sotial-app-2-0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sotial-app-2-0",
    storageBucket: "sotial-app-2-0.appspot.com",
    messagingSenderId: "590471567985",
    appId: "1:590471567985:web:c893c28bab8ee658e4d9d0"
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

