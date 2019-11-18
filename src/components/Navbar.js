import React from 'react';
import {Link} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar} from 'semantic-ui-react'


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
      <Link to="/main" exact>
      <Menu.Item as='a'>
        <Icon name='home' />
        Dashboard
      </Menu.Item>
    </Link>
      <Link to="/search" exact>
      <Menu.Item as='a'>
        <Icon name='search' />
        Search
      </Menu.Item>
      </Link>
      <Link to="/form/" exact>
      <Menu.Item as='a'>
        <Icon name='add' />
        Add
      </Menu.Item>
      </Link>
      <Link to="/fav" exact>
      <Menu.Item as='a'>
        <Icon name='heart' />
        Fav
      </Menu.Item>
      </Link>
    </Sidebar>
  </Sidebar.Pushable>
  )
}

export default Navbar;