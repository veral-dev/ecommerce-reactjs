import React, { Component } from 'react';

/* -- styling ---*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthServices from './services/auth.services'
import CartServices from './services/cart.services'

import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './components/ui/NavBar'

import Home from './components/pages/shop/home/home'
import Signup from './components/pages/auth/signup/Signup'
import Login from './components/pages/auth/login/Login'
import CreateProduct from './components/pages/admin/createProduct/createProduct'
import ProductsList from './components/pages/admin/productList/productList'
import UsersList from './components/pages/admin/userList/userList'
import CreateUser from './components/pages/admin/createUser/createUser'
import UserUpdate from './components/pages/shop/userUpdate/userUpdate'
import ProductDetails from './components/pages/shop/productDetails/productDetails';



class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: false, userCart: [] }
    this.authServices = new AuthServices()
    this.cartServices = new CartServices()

  }


  componentDidUpdate = (prevProps, prevState) => console.log(this.state)
  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    let localCartId = localStorage.getItem('cart')
    this.authServices.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .then(() => this.fetchCart(this.state.loggedInUser.cart))
      .catch(() => this.setState({ loggedInUser: false }, this.fetchCart(localCartId)))
  }

  setTheCart = userCart => this.setState({ userCart: userCart })



  fetchCart = localCartId => {
    this.cartServices.getUserCart(localCartId)
      .then(theCart => this.setState({ userCart: theCart }))
      .catch(() => this.setState({ userCart: false }))
  }


  render() {

    return (
      <div className="App-header">
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} userCart={this.state.userCart} />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Home loggedInUser={this.state.loggedInUser} />} />
            <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
            <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
            <Route path="/admin/products/create" render={() => this.state.loggedInUser ? <CreateProduct loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/products/products-list" render={() => this.state.loggedInUser ? <ProductsList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />

            <Route path="/products/:id" render={props => <ProductDetails loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />

            <Route path="/admin/users/users-list" render={() => this.state.loggedInUser ? <UsersList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/users/create-user" render={() => this.state.loggedInUser ? <CreateUser loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/cuenta/editar/:id" render={() => this.state.loggedInUser ? <UserUpdate loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          </Switch>
        </main>
      </div>

    )
  }
}


export default App