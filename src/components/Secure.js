import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import Login from '../screens/Login';

class Secure extends React.Component {
  state = {
    user: null
  }

  unsubscribe = null
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  // componentWillUnmount() {
  //   if (unsubscribe) {
  //     unsubscribe()
  //   }
  // }

  render() {
    return this.state.user === null ? <Login/> : this.props.children
  }
}

export default Secure;