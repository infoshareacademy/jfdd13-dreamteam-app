import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import Login from '../screens/Login';

const Secure = ({ children }) => {
  const [user, setUser ] = useState(null)

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  })

  return user === null ? <Login /> : children
}

export default Secure;