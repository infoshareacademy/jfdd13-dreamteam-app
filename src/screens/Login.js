import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login, loginWithGoogle } from "../services/AuthService";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Lin
} from "semantic-ui-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const loginError = async () => {
    try {
      await login(email, password);
    } catch (e) {
      setLoginErrorMsg(e.code);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Message info>
          Tylko jeden krok dzieli Cię od znalezienia <br></br> najlepszej dla
          Ciebie wycieczki. <br></br>Załóż konto lub zaloguj się, jeśli już je
          posiadasz <br></br>i zaplanuj podróż marzeń.
        </Message>
        <Header as="h2" color="blue" textAlign="center">
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
              onClick={() => loginError()}
              color="blue"
              fluid
              size="large"
            >
              Zaloguj się
            </Button>
            <Button
              onClick={() => loginWithGoogle()}
              style={{ marginTop: "8px" }}
              color="google plus"
              fluid
              size="large"
            >
              Zaloguj się przez Google
            </Button>
          </Segment>
        </Form>
        {loginErrorMsg && (
          <Message error={true}>Nieudana próba logowania</Message>
        )}
        <Message>
          Chcesz się zarejestrować? - <Link style={{color: "blue"}} to="/register">Kliknij</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
