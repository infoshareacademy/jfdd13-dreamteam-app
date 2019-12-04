import React from 'react';
import {NavLink} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar} from 'semantic-ui-react'
import { signout } from "../services/AuthService";


function Navbar() {

  const navStyle = {
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
      <Menu.Item as={'div'} style={{marginTop: '60px'}}>
        <Icon name='chart line' />
        Statystyki
      </Menu.Item>
    </NavLink>
      <NavLink to="/search" exact>
      <Menu.Item as={'div'}>
        <Icon name='search' />
        Oferta
      </Menu.Item>
      </NavLink>
      <NavLink to="/form/" exact>
      <Menu.Item as={'div'}>
        <Icon name='add' />
        Dodaj
      </Menu.Item>
      </NavLink>
      <NavLink to="/panel" exact>
      <Menu.Item as={'div'}>
        <Icon name='user' />
        Panel
      </Menu.Item>
      </NavLink>
      <NavLink to="/favs" exact>
      <Menu.Item as={'div'}>
        <Icon name='heart' />
        Ulubione
      </Menu.Item>
      </NavLink>
      <NavLink to="#" exact>
        <Menu.Item as={'div'} onClick={() => signout()}>
          <Icon name="sign out" />
          Wyloguj
        </Menu.Item>
      </NavLink>
    </Sidebar>
  </Sidebar.Pushable>
  )
}

export default Navbar;