import React, { useState, useEffect } from 'react';
import { Card, Container, Header, Image, Icon } from "semantic-ui-react";
import firebase from "../firebase";

function UserPanel() {
  const [userData, setUserData] = useState({})
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (!fetched) {
      fetchUser()
      setFetched(true)
    }
    return () => setFetched(!fetched)
    // eslint-disable-next-line
  }, [])

  const fetchUser = async () => {
    const userId = firebase.auth().currentUser.uid;
    const fetched = await firebase.database().ref('/users/' + userId).once('value')
    const user = await fetched.val()
    setUserData(user)
  }

  if (!fetched) return null
  console.log(userData)

  return (
    <Container className="content__wrapper">
      <Header>Your Profile</Header>
      <Card>
        <Image src='https://via.placeholder.com/200x300' wrapped ui={false} />
        <Card.Content>
          <Card.Header>name</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
        22 Friends
      </a>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default UserPanel;