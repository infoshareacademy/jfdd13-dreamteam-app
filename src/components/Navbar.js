import React from 'react';
import {NavLink} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar} from 'semantic-ui-react'

function Navbar() {

  const navStyle = {
    // width: '30%',
    minWidth: '150px',
    height: '100vh',
    position: 'fixed',
    border: 0,
    borderRadius: 0
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
      <Menu.Item style={{marginTop: '60px'}}>
        <Icon name='chart line' />
        Statystyki
      </Menu.Item>
    </NavLink>
      <NavLink to="/search" exact>
      <Menu.Item>
        <Icon name='search' />
        Wyszukaj
      </Menu.Item>
      </NavLink>
      <NavLink to="/form" exact>
      <Menu.Item>
        <Icon name='add' />
        Dodaj
      </Menu.Item>
      </NavLink>
      {/*<NavLink to="/fav" exact>*/}
      {/*<Menu.Item>*/}
      {/*  <Icon name='heart' />*/}
      {/*  Fav*/}
      {/*</Menu.Item>*/}
      {/*</NavLink>*/}
    </Sidebar>
  </Sidebar.Pushable>
  )
}

export default Navbar;