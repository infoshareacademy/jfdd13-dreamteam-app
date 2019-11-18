import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'
import { domainToASCII } from 'url';

function Navbar() {

  const navStyle = {
    height: "100%",
    minHeight: "95vh",
    margin: '0',
    border: 'none',
    borderRadius: '0'
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
        <Link to="/main" exact>Dashboard</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='search' />
        <Link to="/search" exact>Search</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='add' />
        <Link to="/form/" exact>Add</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='heart' />
        <Link to="/fav" exact>Fav</Link>
      </Menu.Item>
    </Sidebar>
  </Sidebar.Pushable>
  )
}

export default Navbar;