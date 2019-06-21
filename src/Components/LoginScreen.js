import React, { Component } from 'react';
import '../App.css';
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Link,Switch, Redirect } from "react-router-dom";
import {browserHistory } from 'react-router'
 

export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            person:[],
            message:'',
        };
    }
    render() {
        let url = 'http://52.172.36.138/api/authorize?client_id=cbBVF0wO6fnwg65L1qRD3QxwBxxqk4WETD4Po9YP&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&state=JkVRNYhB3OpfD6btsqCwhWfLA8mJZ2ur&scope=&response_type=code&approval_prompt=auto';
        window.location = url;
        return (
            <div>  
            </div>
        );
    }
}

