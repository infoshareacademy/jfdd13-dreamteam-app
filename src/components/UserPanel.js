import React from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from "../screens/Register";
import LoggedUser from '../screens/LoggedUser';


function UserPanel() {
  return (
  
    <div className="Favourites">
      <h1 style={{backgroundColor:'yellow'}}>man at work... (with firebase)</h1>
      <Home />
      {/* <Login />
      <Register />
      <LoggedUser /> */}

    </div> 
  )
}; 

export default UserPanel;