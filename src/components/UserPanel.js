import React from 'react';
import { Header } from "semantic-ui-react";
import firebase from "../firebase";

function UserPanel() {
  return (
    <div>
      <Header>dane z firebase dla usera {firebase.auth().currentUser.uid} </Header>
    </div>
  )
}

export default UserPanel;