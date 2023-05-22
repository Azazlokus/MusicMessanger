import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes} from "react-router-dom";
import AppRoutes from "./Components/Routes/AppRoutes";
import News from "./Components/Pages/News/News";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <AppRoutes/>
    </BrowserRouter>
);

