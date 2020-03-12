import React, { Component } from 'react';

/* -- styling ---*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthServices from './services/auth.services'
import CartServices from './services/cart.services'
import UserServices from './services/user.services'


import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './components/ui/NavBar'
import Footer from './components/ui/footer'

import Home from './components/pages/shop/home/home'
import Signup from './components/pages/auth/signup/Signup'
import Login from './components/pages/auth/login/Login'
import CreateProduct from './components/pages/admin/createProduct/createProduct'
import ProductsList from './components/pages/admin/productList/productList'
import EditProduct from './components/pages/admin/editProduct/editProduct'

import UsersList from './components/pages/admin/userList/userList'
import CreateUser from './components/pages/admin/createUser/createUser'
import UserUpdate from './components/pages/shop/userUpdate/userUpdate'
import ProductDetails from './components/pages/shop/productDetails/productDetails';
import CartDetails from './components/pages/shop/cartDetails/cartDetails'
import Checkout from './components/pages/shop/checkout/checkout'
import ShopProductsList from './components/pages/shop/productList/shopProductList'




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
      .catch(() => { this.setState({ loggedInUser: false }); localCartId ? this.fetchCart(localCartId) : this.postCart(this.state.userCart) })
  }

  setTheCart = userCart => this.setState({ userCart: userCart })

  postCart = () => {
    this.cartServices.postCart(this.state.userCart)
      .then(theCart => this.setState({ userCart: { ...this.state.userCart, _id: theCart._id } }))
      .then(() => this.state.loggedInUser ? this.updateUser() : localStorage.setItem('guestCart', this.state.userCart._id))
      .catch(err => new Error(err))
  }

  updateUser = () => {
    let userCopy = this.state.loggedInUser
    userCopy.cart = this.state.userCart
    this.userServices.updateUser(this.state.loggedInUser._id, userCopy)
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(err => new Error(err))
  }

  fetchCart = cartId => {
    this.cartServices.getUserCart(cartId)
      .then(theCart => this.setState({ userCart: theCart }))
      .catch(() => this.postCart(this.state.userCart))
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

            <Route path="/admin/products/create" render={() => this.state.loggedInUser.role === 'admin' ? <CreateProduct loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/products-list" render={() => this.state.loggedInUser.role === 'admin' ? <ProductsList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/editar-producto/:id" render={props => this.state.loggedInUser.role === 'admin' ? <EditProduct loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} /> : <Redirect to="/" />} />
            <Route path="/admin/users/users-list" render={() => this.state.loggedInUser.role === 'admin' ? <UsersList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/users/create-user" render={() => this.state.loggedInUser.role === 'admin' ? <CreateUser loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/coleccion" render={() => this.state.loggedInUser.role === 'admin' ? <ProductsList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />

            <Route path="/productos/:id" render={props => <ProductDetails loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />
            <Route path="/coleccion" render={props => <ShopProductsList loggedInUser={this.state.loggedInUser} {...props} />} />

            <Route path="/cart" render={props => <CartDetails loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />}
            <Route path="/finalizar-compra" render={props => <Checkout loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />}

            <Route path="/cuenta/editar/:id" render={() => this.state.loggedInUser ? <UserUpdate loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          </Switch>
        </main>
        <Footer />
      </div>

    )
  }
}


export default App