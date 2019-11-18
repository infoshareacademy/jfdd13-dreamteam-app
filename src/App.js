import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TripContainer from "./components/TripContainer";
import Form from "./components/Form";
import Appbar from "./components/Appbar";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    // <BrowserRouter>
      <div className="App">
        <Appbar />
        <Navbar />
        {/* <Switch>
          <Route exact strict path="/" component={() => <h1>App</h1>} />
          <Route exact path="/main" component={() => <h1>Dashboard</h1>} />
          <Route exact path="/trip" component={() => <h1>TripContainer</h1>} />
          <Route exact path="/form/" component={() => <h1>Form</h1>} />
          <Route component={() => <h1>404 - sadface</h1>} />
        </Switch> */}
        <Dashboard />
        <TripContainer />
        <Form />        
      </div>
    // </BrowserRouter>
  );
}

export default App;
