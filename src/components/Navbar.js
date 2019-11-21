import React from 'react';
import {NavLink} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar} from 'semantic-ui-react'

function Navbar() {

  const navStyle = {
    position: 'fixed',
    left: '0',
    width: '150px',
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
      visible={true}
      width='thin'
    >
      <NavLink to="/main" exact>
      <Menu.Item>
        <Icon name='home' />
        Dashboard
      </Menu.Item>
    </NavLink>
      <NavLink to="/search" exact>
      <Menu.Item>
        <Icon name='search' />
        Search
      </Menu.Item>
      </NavLink>
      <NavLink to="/form/" exact>
      <Menu.Item>
        <Icon name='add' />
        Add
      </Menu.Item>
      </NavLink>
      <NavLink to="/fav" exact>
      <Menu.Item>
        <Icon name='heart' />
        Fav
      </Menu.Item>
      </NavLink>
    </Sidebar>
  </Sidebar.Pushable>
  )
}

export default Navbar;