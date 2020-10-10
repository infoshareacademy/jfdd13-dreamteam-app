import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import Dashboard from "./components/Dashboard";
import TripForm from "./components/Form/Form";
import Favorites from "./components/Favourites";
import Search from "./components/Search";
import Appbar from "./layout/Appbar";
import 'semantic-ui-css/semantic.min.css'
import UserPanel from './components/UserPanel';
import Register from './screens/Register';
import Login from './screens/Login';
import LoggedUser from './screens/LoggedUser';
import Favicon from 'react-favicon';
function App() {
  return (
    <>
      <Favicon url="../public/favicon.ico" />
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <main className={'main'}>
            <Appbar />
            <Switch>
              <Route exact strict path="/" component={Dashboard} />
              <Route exact strict path="/main" component={Dashboard} />
              <Route exact strict path="/search" component={Search} />
              <Route exact strict path="/panel" component={UserPanel} />
              <Route exact strict path="/register" component={Register} />
              <Route exact strict path="/login" component={Login} />
              <Route exact strict path="/user" component={LoggedUser} />
              <Route exact strict path="/form" component={TripForm} />
              <Route exact strict path="/favs" component={Favorites} />
              <Route component={() => <h1>404 - sadface</h1>} />
            </Switch>
          </main>
        </div>
        <Redirect to="/" />
      </BrowserRouter>
    </>
  );
}

export default App;
