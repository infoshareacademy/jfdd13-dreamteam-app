import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
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
  const menuItem = (elText = '', linkTo = '', iconName = '', iconStyle = {}, elType = 'div', elStyle = {}) => {
    return (
      <NavLink to={linkTo} exact>
        <Menu.Item as={elType} style={elStyle} className={'navItem'}>
          <Icon name={iconName} style={iconStyle} />
          {windowWidth > 500 ? elText : ''}
        </Menu.Item>
      </NavLink>
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
        width={
          windowWidth < 500 ? 'very thin' : 'thin'
        }>

        {
          menuItem('Statystyki', '/main', 'chart line', {}, 'div', { marginTop: '60px' })
        }
        {
          menuItem('Oferta', '/search', 'search')
        }
        {
          menuItem('Dodaj', '/form/', 'add')
        }
        {
          menuItem('Ulubione', '/favs', 'heart')
        }
        {
          menuItem('Panel', '/panel', 'user')

        }

        <NavLink to="#" exact>
          <Menu.Item as={'div'} className='navItem' onClick={() => signout()}>
            <Icon name="sign out" />
            {windowWidth > 500 ? 'Wyloguj' : ''}
          </Menu.Item>
        </NavLink>
      </Sidebar>
    </Sidebar.Pushable>
  )
}

export default Navbar;