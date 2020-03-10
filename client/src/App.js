import React, { Component } from 'react';

/* -- styling ---*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthServices from './services/auth.services'
import CartServices from './services/cart.services'
import UserServices from './services/user.services'


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
import CartDetails from './components/pages/shop/cartDetails/cartDetails'
import Checkout from './components/pages/shop/checkout/checkout'



class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: false, userCart: { products: [], total: 0, cartIconQuantity: 0 } }
    this.authServices = new AuthServices()
    this.cartServices = new CartServices()
    this.userServices = new UserServices()

  }


  componentDidUpdate = (prevProps, prevState) => console.log('DidUpdate App', this.state)
  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    let localCartId = localStorage.getItem('guestCart')
    this.authServices.loggedin()
      .then(theUser => { this.setState({ loggedInUser: theUser }); theUser.cart ? this.fetchCart(theUser.cart) : this.postCart(this.state.userCart) })
      // .then(() => { this.state.loggedInUser.cart ? this.fetchCart(this.state.loggedInUser.cart) : this.postCart() })
      .catch(() => { this.setState({ loggedInUser: false }); localCartId ? this.fetchCart(localCartId) : this.postCart(this.state.userCart) })
  }

  // if (this.props.userCart.length === 0) this.postCart()

  setTheCart = userCart => this.setState({ userCart: userCart })

  postCart = () => {
    this.cartServices.postCart(this.state.userCart)
      .then(theCart => this.setState({ userCart: { ...this.state.userCart, _id: theCart._id } }))
      .then(() => this.state.loggedInUser ? this.updateUser() : localStorage.setItem('guestCart', this.state.userCart._id))
      .catch(err => console.log(err))
  }

  updateUser = () => {
    let userCopy = this.state.loggedInUser
    userCopy.cart = this.state.userCart
    this.userServices.updateUser(this.state.loggedInUser._id, userCopy)
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(err => console.log(err))
  }

  fetchCart = cartId => {
    this.cartServices.getUserCart(cartId)
      .then(theCart => this.setState({ userCart: theCart }))
      .catch(() => this.postCart(this.state.userCart))

    // .catch(() => this.setState({ userCart: false }))
  }


  render() {

    return (
      <div className="App-header">
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Home loggedInUser={this.state.loggedInUser} />} />
            <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
            <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
            <Route path="/admin/products/create" render={() => this.state.loggedInUser ? <CreateProduct loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/products/products-list" render={() => this.state.loggedInUser ? <ProductsList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />

            <Route path="/products/:id" render={props => <ProductDetails loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />
            <Route path="/cart" render={props => <CartDetails loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />}
            <Route path="/checkout" render={props => <Checkout loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />}

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