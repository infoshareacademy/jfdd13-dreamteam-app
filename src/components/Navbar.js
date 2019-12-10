import React from 'react';
import {NavLink} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar} from 'semantic-ui-react'
import { signout } from "../services/AuthService";


function Navbar() {
  const windowWidth = window.screen.width;

  const navStyle = {
    minWidth: windowWidth > 500 ? '150px' : '60px',
    height: '100vh',
    position: 'fixed',
    border: 0,
    borderRadius: 0
  };
  const menuItem = ( elText='', iconName='', iconStyle={},elType='div', elStyle={}) => {
    return (
        <Menu.Item as={elType} style={elStyle} className={'navItem'} >
          <Icon name={iconName} style={iconStyle}/>
          {windowWidth > 500 ? elText : ''}
        </Menu.Item>
    )
  };
  return (
  <Sidebar.Pushable as={Segment} style={navStyle}>
      <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          vertical
          visible
          width={windowWidth < 500 ? 'very thin': 'thin'
          }
      >
        <NavLink to="/main" exact>

          {menuItem('Statystyki', 'chart line',{} , 'div', {marginTop: '60px'} )}
        </NavLink>
        <NavLink to="/search" exact>
          {menuItem('Oferta', 'search')}
        </NavLink>
        <NavLink to="/form/" exact>
          {menuItem('Dodaj', 'add')}
        </NavLink>
        <NavLink to="/favs" exact>
          {menuItem('Ulubione', 'heart')}
        </NavLink>
        <NavLink to="#" exact>
          <Menu.Item as={'div'} className='navItem' onClick={() => signout()}>
            <Icon name="sign out" />
            {windowWidth > 500 ? 'Wyloguj':''}
          </Menu.Item>
        </NavLink>
      </Sidebar>
  </Sidebar.Pushable>
  )
}

export default Navbar;