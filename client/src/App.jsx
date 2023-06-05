//import logo from './logo.svg';
import './App.css'; 
import React from 'react';
import Home from './components/Home';
import Calendar from './components/Calendar';
import {Login} from './components/Login';
import { Register } from './components/Register';
import { Route, Routes } from 'react-router-dom';
import { Auth } from './components/Auth';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
      
      <AuthProvider>
        <Routes>
          <Route  path='/' element={<Home />} />
          <Route  path='/calendar' element={<Auth><Calendar /></Auth>} /> 
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>  
      </AuthProvider>
      
  );
}

export default App;
