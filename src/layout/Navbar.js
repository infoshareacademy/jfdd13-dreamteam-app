import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { signout } from "../services/AuthService";


function Navbar() {
  const windowWidth = window.screen.width;

  const MenuItem = (props) => {
    const { elText, linkTo, iconName, iconStyle, elType, elStyle, click } = props
    return (
      <NavLink to={linkTo} exact>
        <Menu.Item as={elType} style={elStyle} className={'navItem'} onClick={click ? () => click() : null}>
          <Icon name={iconName} style={iconStyle} />
          {windowWidth > 500 ? elText : ''}
        </Menu.Item>
      </NavLink>
    )
  };
  MenuItem.defaultProps = {
    elText: '',
    linkTo: '',
    iconName: '',
    iconStyle: {},
    elType: 'div',
    elStyle: {},
    click: null
  }
  return (
    <Sidebar.Pushable as={Segment} className={'NavStyles'}>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible
        width={
          windowWidth < 500 ? 'very thin' : 'thin'
        }
      >
        <MenuItem elText='Statystyki' linkTo='/main' iconName='chart line' elStyle={{ marginTop: '60px' }} />
        <MenuItem elText='Oferta' linkTo='/search' iconName='search' />
        <MenuItem elText='Dodaj' linkTo='/form' iconName='add' />
        <MenuItem elText='Ulubione' linkTo='/favs' iconName='heart' />
        <MenuItem elText='Panel' linkTo='/panel' iconName='user' />
        <MenuItem elText='Wyloguj' linkTo='#' iconName='sign out' click={signout} />
      </Sidebar>
    </Sidebar.Pushable>
  )
}

export default Navbar;