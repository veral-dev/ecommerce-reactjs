import React, { Component } from 'react';

/* -- styling ---*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthServices from './services/auth.services'

import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './components/ui/NavBar'

import Home from './components/pages/shop/home/home'
import Signup from './components/pages/auth/signup/Signup'
import Login from './components/pages/auth/login/Login'
import CreateProduct from './components/pages/admin/createProduct/createProduct'
import ProductsList from './components/pages/admin/productList/productList'
import UsersList from './components/pages/admin/userList/userList'
import CreateUser from './components/pages/admin/createUser/createUser'
import ProductDetails from './components/pages/shop/productDetails/productDetails';



class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: false }
    this.authServices = new AuthServices()
  }


  componentDidUpdate = (prevProps, prevState) => console.log("El estado de App se ha actualizado:", this.state)
  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })
  fetchUser = () => {
    this.authServices.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }


  render() {

    return (
      <div className="App-header">
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Home loggedInUser={this.state.loggedInUser} />} />
            <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
            <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
            <Route path="/admin/products/create" render={() => this.state.loggedInUser ? <CreateProduct loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/products/products-list" render={() => this.state.loggedInUser ? <ProductsList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/products/:id" render={props => <ProductDetails {...props} />} />
            <Route path="/admin/users/users-list" render={() => this.state.loggedInUser ? <UsersList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/users/create-user" render={() => this.state.loggedInUser ? <CreateUser loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          </Switch>
        </main>
      </div>

    )
  }
}


export default App