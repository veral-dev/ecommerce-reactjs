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
import OrderDetails from './components/pages/shop/orderDetails/orderDetails'
import ShopProductsList from './components/pages/shop/productList/shopProductList'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import Button from 'react-bootstrap/Button';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: false,
      userCart: { products: [], total: 0, cartIconQuantity: 0 },
      anchorEl: null,
      adminMenu: false,
    }
    this.authServices = new AuthServices()
    this.cartServices = new CartServices()
    this.userServices = new UserServices()

  }

  componentDidUpdate = (prevProps, prevState) => console.log('DidUpdate App', this.state)
  componentDidMount = () => this.fetchUser()

  setTheUser = userObj => this.setState({ loggedInUser: userObj })
  setTheCart = userCart => this.setState({ userCart: userCart })

  fetchUser = () => {
    let localCartId = localStorage.getItem('guestCart')
    this.authServices.loggedin()
      .then(theUser => { this.setState({ loggedInUser: theUser }); theUser.cart ? this.fetchCart(theUser.cart) : this.postCart(this.state.userCart) })
      .catch(() => { this.setState({ loggedInUser: false }); localCartId ? this.fetchCart(localCartId) : this.postCart(this.state.userCart) })
  }

  fetchCart = cartId => {
    this.cartServices.getUserCart(cartId)
      .then(theCart => this.setState({ userCart: theCart }))
      .catch(() => this.postCart(this.state.userCart))
  }

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

  openAdminMenu = () => this.setState({ adminMenu: !this.state.adminMenu })

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="App">
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Home loggedInUser={this.state.loggedInUser} />} />

            <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
            <Route path="/login" render={props => <Login setTheUser={this.setTheUser} fetchCart={this.fetchCart} postCart={this.postCart} {...props} />} />

            <Route path="/admin/productos/crear" render={() => this.state.loggedInUser.role === 'admin' ? <CreateProduct loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/lista-productos" render={() => this.state.loggedInUser.role === 'admin' ? <ProductsList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/editar-producto/:id" render={props => this.state.loggedInUser.role === 'admin' ? <EditProduct loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} /> : <Redirect to="/" />} />
            <Route path="/admin/usuarios/lista-usuarios" render={() => this.state.loggedInUser.role === 'admin' ? <UsersList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/usuarios/crear-usuario" render={() => this.state.loggedInUser.role === 'admin' ? <CreateUser loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
            <Route path="/admin/coleccion" render={() => this.state.loggedInUser.role === 'admin' ? <ProductsList loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />

            <Route path="/productos/:id" render={props => <ProductDetails loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />
            <Route path="/coleccion" render={props => <ShopProductsList loggedInUser={this.state.loggedInUser} {...props} />} />

            <Route path="/carrito" render={props => <CartDetails loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />}
            <Route path="/finalizar-compra" render={props => <Checkout loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} setTheUser={this.setTheUser} userCart={this.state.userCart} {...props} />} />}
            <Route path="/pedido-confirmado" render={props => <OrderDetails loggedInUser={this.state.loggedInUser} setTheCart={this.setTheCart} userCart={this.state.userCart} {...props} />} />}

            <Route path="/cuenta/editar/:id" render={props => this.state.loggedInUser ? <UserUpdate loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} {...props} /> : <Redirect to="/" />} />
          </Switch>
        </main>
        {this.state.loggedInUser && this.state.loggedInUser.role === "admin" ?
          (<>
            <Button variant="warning" className="admin-button" onClick={this.handleMenu}><SupervisorAccountIcon />Menu administrador</Button>

            <Menu id="fade-menu" keepMounted TransitionComponent={Fade}
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{ style: { transform: 'translateY(-20%)' } }} >
              <div className="adminMenu">
                <List component="nav" style={{ padding: '0' }}>
                  <ListItem button>
                    <Link to="/admin/lista-productos" onClick={this.handleClose}>Lista de productos</Link>
                  </ListItem>
                  <Divider />
                  <ListItem button divider>
                    <Link to="/admin/lista-usuarios" onClick={this.handleClose}>Lista de usuarios</Link>
                  </ListItem>
                  <ListItem button>
                    <Link to="/admin/productos/crear" onClick={this.handleClose}>Crear nuevo producto</Link>
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <Link to="/admin/facturas" onClick={this.handleClose}>Facturas</Link>
                  </ListItem>
                </List>
              </div>
            </Menu>
          </>) : null}

        <Footer />
      </div>

    )
  }
}


export default App