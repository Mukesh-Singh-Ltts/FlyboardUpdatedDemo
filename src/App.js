import React, { Component } from 'react';
import './App.css';
//import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import LoginScreen from "./Components/LoginScreen";
import Dashboard from "./Components/Dashboard";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/" component={LoginScreen} />
        </Switch>
      </div>
    );
  }
}
export default App;
