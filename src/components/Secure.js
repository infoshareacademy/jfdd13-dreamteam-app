import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import firebase from "firebase";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Secure = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  if (isLoggedIn == null) {
    return <h1>Poczekaj, sprawdzam!</h1>;
  }

  if (isLoggedIn === false) {
    return (
      <div>
        <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login}>
            <Login />
          </Route>
          <Route exact path="/register" component={Register}>
            <Register />
          </Route>  
          <Redirect to="/login"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  if (isLoggedIn === true) {
    return props.children;
  }
};

export default Secure;
