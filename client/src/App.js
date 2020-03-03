import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthServices from './services/auth.services'
import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './components/ui/NavBar'

import Home from './components/pages/home'
import Signup from './components/pages/auth/signup/Signup'
import Login from './components/pages/auth/login/Login'
import CreateProduct from './components/pages/createProduct/createProduct'
import ProductsList from './components/pages/productList/productList'
import Container from 'react-bootstrap/Container';


class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: false }
    this.services = new AuthServices()
  }


  componentDidUpdate = (prevProps, prevState) => console.log("El estado de App se ha actualizado:", this.state)
  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })
  fetchUser = () => {
    this.services.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }


  render() {

    return (
      <div className="App-header">
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
        <main>
          <Container>
            <Switch>
              <Route exact path="/" render={() => <Home loggedInUser={this.state.loggedInUser} />} />
              <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
              <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
              <Route path="/products/create" render={() => this.state.loggedInUser ? <CreateProduct loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
              <Route path="/products/list" render={() => this.state.loggedInUser ? <ProductsList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />

            </Switch>
          </Container>
        </main>
      </div>

    )
  }
}


export default App