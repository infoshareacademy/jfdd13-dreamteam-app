import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TripContainer from "./components/TripContainer";
import Form from "./components/Form";
import Appbar from "./components/Appbar";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    // <Router>
      <div className="App">
<Appbar />
        <Navbar />
        {/* <Switch>
          <Route exact strict sensitive path="/" component={App} />
          <Route path="/main" component={Dashboard} />
          <Route path="/trip" component={TripContainer} />
          <Route path="/form" component={Form} />
          <Route component={() => <h1>404 - sadface</h1>} />
        </Switch> */}
        <Dashboard />
        <TripContainer />
        <Form />        
      </div>
    // </Router>
  );
}

export default App;
