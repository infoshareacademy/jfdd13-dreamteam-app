import React from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'

function Navbar() {

  const navStyle = {
    height: "100%",
    minHeight: "95vh",
    margin: '0',
    border: 'none'
  };
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
  </Sidebar.Pushable>
  )
}

export default Navbar;