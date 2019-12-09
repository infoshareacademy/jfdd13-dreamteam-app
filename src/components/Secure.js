import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import firebase from "firebase";
import Login from "../screens/Login";
import Register from "../screens/Register";
import {Grid} from "semantic-ui-react";
import Loader from 'react-loader-spinner'

const Secure = props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  if (user == null) {
    return       <Grid style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
      <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={0}
      />
        </Grid>

  }

  if (user === false) {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  if (user === true) {
    return props.children;
  }
};

export default Secure;
