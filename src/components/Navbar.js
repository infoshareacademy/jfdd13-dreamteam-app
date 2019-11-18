import React from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'

function Navbar() {

  const navStyle = {
    height: "100%",
    minHeight: "100vh"
  }
  return (
  <Sidebar.Pushable as={Segment} style={navStyle}>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible="true"
      width='thin'
    >
      <Menu.Item as='a'>
        <Icon name='home' />
        Dashboard
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='search' />
        Search
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='add' />
        Add 
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='heart' />
        Fav
      </Menu.Item>
    </Sidebar>
    <Sidebar.Pusher>
      <Segment basic>
        <Header as='h3'>Application Content</Header>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
  )
};

export default Navbar;