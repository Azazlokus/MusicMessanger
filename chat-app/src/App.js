import React from 'react';
import LogIn from './Components/Log_in/logIn';
import '../src/mian.css';
import {Route, Routes} from 'react-router-dom';
import Regist from './Components/Registr/register';
import PrivateRoute from './Components/Utils/Router/privateRouter';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<LogIn/>}/>
        </Route>

        <Route path='/' element={<LogIn/>}/>
        
        <Route path='Regist' element={<Regist/>}/>
      </Routes>
    </div>
  );
}

export default App;
