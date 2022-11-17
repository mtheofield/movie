import Login from '../components/Login';
import Logout from '../components/Logout';
import useToken from '../components/useToken';
import React, { useState } from 'react';
import Header from '../components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './About';
import WriteReview from './WriteReview';
import Dashboard from './Dashboard';


export default function Home() {
  const { token, setToken } = useToken();


  if (!token) {
    return <Login setToken={setToken} />
  }


  return (
    <div>
      <Router>
        {}
        <NavigationHeader />
        { }
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/writeReview" component={WriteReview} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  );
}