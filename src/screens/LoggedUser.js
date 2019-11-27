import React, {useState} from "react";
import { Button, Grid, Header, } from "semantic-ui-react";

const LoggedUser = () => {
  const [name, setName] = useState("")
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Witaj
        </Header>
        <Button
          // onClick={() => 
          //   login(email, password)
          // .then(() => {props.history.replace("/profil");
          // })
          // }
          color="teal"
          fluid
          size="large"
          >
          Wyloguj
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default LoggedUser;
