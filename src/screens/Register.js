import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { register } from "../services/AuthService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
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
              placeholder="Your name"
            />
            <Form.Input
              value={email}
              onChange={event => setEmail(event.target.value)}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              value={password}
              onChange={event => setPassword(event.target.value)}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button onClick={() => register(email, password, name)} color="teal" fluid size="large">
              Zarejestruj się
            </Button>
          </Segment>
        </Form>
        <Message>
          Jesteż zarejestrowany? <Link to="/login">Zaloguj się</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;