import React, { useState, useEffect } from 'react';
import { Card, Container, Header, Image, Icon } from "semantic-ui-react";
import firebase from "../firebase";
import { stopUsers } from '../services/UserService';

function UserPanel() {
  const [userData, setUserData] = useState({})
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
      fetchUser()
      setFetched(true)
    return () => stopUsers()
    // eslint-disable-next-line
  }, [])

  const fetchUser = async () => {
    const userId = firebase.auth().currentUser.uid;
    const fetched = await firebase.database().ref('/users/' + userId).once('value')
    const user = await fetched.val()
    setUserData(user)
  }

  const yearFromTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.getFullYear()
  }

  if (!fetched) return null
  console.log(userData)
  const {name, email, date} = userData
  const registerYear = yearFromTimestamp(date)
  return (
    <Container className="content__wrapper">
      <Header>Your Profile</Header>
      <Card>
        <Image src='https://via.placeholder.com/200x300' wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in {registerYear}</span>
          </Card.Meta>
          <Card.Description>
            Email: {email}
          </Card.Description>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default UserPanel;