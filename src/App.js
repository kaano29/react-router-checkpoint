import React, { Component } from 'react'
import Login from './components/Login'
import TopNav from './components/TopNav'
import Signup from './components/Signup'
import UserProfile from './components/UserProfile'
import './App.css'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

class App extends Component {

  render() {
    const userLoggedIn = Object.keys(this.props.user).length !== 0
    return (
      <div>
        <BrowserRouter>
          <TopNav/>
          <Switch>
            <Redirect exact from='/' to="/login" />
            <Route exact path="/login">{userLoggedIn ? <Redirect to="/profile" /> : <Login />}</Route>
            <Route exact path="/profile">{userLoggedIn ? <UserProfile /> : <Redirect to="/login" />}</Route>
            <Route path='/signup'><Signup /></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, null)(App)
