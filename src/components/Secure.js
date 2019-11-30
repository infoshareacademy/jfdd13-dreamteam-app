import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import Login from '../screens/Login';

const Secure = ({ children }) => {
  const [user, setUser ] = useState(null)
  console.log(user)

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => setUser({ user }));
  }, [])

  return user === null ? <Login /> : children
}

export default Secure;