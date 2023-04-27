import React from 'react';
import '../src/mian.css';
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from './Components/Utils/Router/privateRouter';
import Login from "./Components/Pages/Login page/login";
import Registration from "./Components/Pages/Registration page/registration";
import LocalPage from "./Components/Pages/Local page/localPage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Login/>} />
        </Route>

        <Route path='/' element={<Login/>}/>
        
        <Route path='Regist' element={<Registration/>}/>

        <Route path='ChatPage' element/>

        <Route path='LocalPage' element={<LocalPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
