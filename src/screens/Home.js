import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import {Button, Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

class Home1 extends Component {
  state = {};

  render() {
    const { fixed } = this.state;

    return (
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 10, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item position="right">
                  <Button as="a"  inverted={!fixed}
                  onClick={() => {
                    fetch('https://dreamteam-app.firebaseio.com/test.json', {
                      method: 'POST',
                      body: JSON.stringify({
                        test: 'just onClick test', 
                        date: new Date().toLocaleString()
                      }).toLowerCase() 
                    }); console.log('you have sent a test')
                  }}
                  > 
                    Test database
                  </Button>
                  <Button as="a" inverted={!fixed}>
                    Zaloguj
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    Zarejestruj
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
    );
  }
}

function Home () {

  const navStyle = {
    width: '100vw',
    minHeight: '100px',
    position: 'right',
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
            }); console.log('you have sent a test')
          }}
      >
        <Icon name='text cursor' />
        Test database
      </Menu.Item>
      </NavLink>

      <NavLink to="/login" exact>
      <Menu.Item>
        <Icon name='user secret' />
        Zaloguj
      </Menu.Item>
      </NavLink>
      
      <NavLink to="/register" exact>
      <Menu.Item>
        <Icon name='registered' />
        Zarejestruj
      </Menu.Item>
      </NavLink>
     
    </Sidebar>
  </Sidebar.Pushable>

  )
}

export default Home;