import React, { Component } from "react";
import {Button, Input, Container, Grid, Header, Menu, Segment } from "semantic-ui-react";

class Home extends Component {
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
                      body: JSON.stringify({test: 1}).toLowerCase() // added to stndarize recipes i base -JK
                    })
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

export default Home;