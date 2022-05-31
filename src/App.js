import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
   <Router>
     <Route exact path="/" ><Login /></Route> 
     <Route  path="/home"> <Home /></Route>  
   </Router>
  );
}

export default App;
