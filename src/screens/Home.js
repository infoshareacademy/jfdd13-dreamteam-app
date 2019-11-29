import React from "react";
import {NavLink} from 'react-router-dom';
import {Icon, Menu, Segment, Sidebar, Grid } from "semantic-ui-react";
import Test from './Test'

function Home () {

  const navStyle = {
    width: '100vw',
    minHeight: '100px',
    border: 0,
    borderRadius: 0
  };
  return (<div>
  <Sidebar.Pushable as={Segment} style={navStyle}>
    <Sidebar 
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      direction='top'
      visible={true}
      width='thin'
    >
      <NavLink to="#" exact>
      <Menu.Item
        onClick={() => {
        fetch('https://dreamteam-app.firebaseio.com/test.json', {
          method: 'POST',
          body: JSON.stringify({
            test: 'just onClick test', 
            date: new Date().toLocaleString()
            }).toLowerCase() 
          });
        }}>
        <Icon name='upload' />
        Test database
      </Menu.Item>
      </NavLink>
      <NavLink to="#" exact>
      <Menu.Item
          onClick={() => {
            fetch('https://dreamteam-app.firebaseio.com/test.json'); 
            console.log('getting news')
          }}>
        <Icon name='download' />
        GET from database
      </Menu.Item>
      </NavLink>

      <NavLink to="/login" exact>
      <Menu.Item>
        <Icon name='sign in' />
        Zaloguj
      </Menu.Item>
      </NavLink>

      <NavLink to="/register" exact>
      <Menu.Item>
        <Icon name='signup' />
        Zarejestruj
      </Menu.Item>
      </NavLink>
    </Sidebar>
  </Sidebar.Pushable>
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <Test />
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </div>
  )
}

export default Home;