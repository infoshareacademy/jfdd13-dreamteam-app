import React, {useState} from "react";
import {login} from "../services/AuthService";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Zaloguj się 
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              value={email}
              onChange={event => setEmail(event.target.value)}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail"
            />
            <Form.Input
              value={password}
              onChange={event => setPassword(event.target.value)}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Hasło"
              type="password"
            />

            <Button
              onClick={async(props) => {
                try {
                  await login(email, password)
              } catch {
                setLoginFailed(true)
              }}}
              color="teal"
              fluid
              size="large"
            >
              Zaloguj się
            </Button>
            {loginFailed ?
            <Message error={true} > 
              Nieudana próba logowania 
            </Message> : ''}
              
          </Segment>
        </Form>
        <Message>
          Chcesz się zarejestrować? - <a href="/register">Kliknij</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;