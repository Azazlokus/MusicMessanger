import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import Registration from "./Components/Pages/Registration/Registration";
import News from "./Components/Pages/News/News";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <News/>
    </BrowserRouter>
);

