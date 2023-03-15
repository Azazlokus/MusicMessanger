import React from 'react';

import '../src/mian.css';
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from './Components/Utils/Router/privateRouter';
import Regist from './Components/Registr/register';
import LogIn from './Components/Log_in/logIn';
import ChatPage from './Components/Chat_Page/chatPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<LogIn/>}/>
        </Route>

        <Route path='/' element={<LogIn/>}/>
        
        <Route path='Regist' element={<Regist/>}/>

        <Route path='ChatPage' element={<ChatPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
