import React from 'react';
import { Container, Header } from "semantic-ui-react";
import firebase from "../firebase";

function UserPanel() {

  const fetchUser = async () => {
    const userId = firebase.auth().currentUser.uid;
    const fetched = await firebase.database().ref('/users/' + userId).once('value')
    const user = fetched.val()
    console.log(user)
  }
  fetchUser()

  return (
    <Container className="content__wrapper">
      <Header>Your Profile</Header>
    </Container>
  )
}

export default UserPanel;