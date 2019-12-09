import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { register } from "../services/AuthService";

const Register = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerErrorMsg, setRegisterErrorMsg] = useState("");

  const registerError = async () => {
    try {
      await register(email, password);
    } catch (e) {
      setRegisterErrorMsg(e.code);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          Utwórz konto
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              value={name}
              onChange={event => setName(event.target.value)}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Imię"
            />
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
              onClick={() => registerError()}
              color="blue"
              fluid
              size="large"
            >
              Zarejestruj się
            </Button>
          </Segment>
        </Form>
        {registerErrorMsg && (
          <Message error={true}>Podaj poprawny E-mail oraz Hasło</Message>
        )}
        <Message>
          Jesteś już zarejestrowany? - <Link style={{color: "blue"}} to="/login">Zaloguj się</Link>
        </Message>
      <Message info>
        Tylko jeden krok dzieli Cię od znalezienia <br></br> najlepszej dla
        Ciebie wycieczki. <br></br>Załóż konto lub zaloguj się, jeśli już je
        posiadasz <br></br>i zaplanuj podróż marzeń.
      </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
