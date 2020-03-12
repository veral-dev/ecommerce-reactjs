import React, { Component } from 'react'

/* ----STYLING----*/
import '../shop.css'
import './checkout.css'


/* ----SERVICES----*/
import ProductServices from '../../../../services/product.services'
import UserServices from '../../../../services/user.services'
import CartServices from '../../../../services/cart.services'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

import UserFormCheckout from './userFormCheckout'
// import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
/* ----ICONS---- */


class Checkout extends Component {

    constructor(props) {
        super(props)
        this.productServices = new ProductServices()
        this.userServices = new UserServices()
        this.cartServices = new CartServices()

        this.state = {
            user: {},
            cart: {},
            choosedProduct: { product: '', model: '', quantity: 1 },
            showtoast: false,
            showmodal: false,
        }
    }


    componentDidMount = () => {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.userCart._id !== this.props.userCart._id) this.setState({ cart: this.props.userCart })
    }


    handleQuantity = (action, id) => {
        let cartCopy = { ...this.state.cart }

        let quantity = cartCopy.products[id].quantity


        if (action === 'rest') { if (quantity > 1) { quantity-- } } else { if (quantity < 10) { quantity++ } }
        cartCopy.products[id].quantity = quantity
        cartCopy.products[id].subtotal = cartCopy.products[id].price * quantity
        cartCopy.total = cartCopy.cartIconQuantity = 0
        cartCopy.products.forEach(elm => { cartCopy.total += elm.subtotal; cartCopy.cartIconQuantity += elm.quantity })
        this.updateCart(cartCopy)
    }

    deleteFromCart = (idx) => {
        let cartCopy = { ...this.state.cart }
        cartCopy.products.splice(idx, 1)
        this.updateCart(cartCopy)

    }

    updateCart = (cart) => {
        this.cartServices.updateCart(this.state.cart._id, cart)
            .then(theCart => {
                this.setState({ cart: theCart }, () => this.props.setTheCart(this.state.cart))
            })
            .catch(err => console.log(err))
    }

    setTheUser = userObj => {
        console.log(userObj)
        this.setState({ user: userObj })
    }


    /*----LOAD PRODUCTS----*/
    // getProductDetails = () => {
    //     this.productServices.getProductDetails(this.props.match.params.id)
    //         .then(theProduct => this.setState({ product: theProduct }))
    //         .then(() => this.setState({ modelPrev: [...this.state.product.model] }))
    //         .catch(err => console.log(err))
    // }

    /*----UPDATE USER----*/
    // updateUser = () => {
    //     let userCopy = this.state.user
    //     userCopy.cart = this.state.cart
    //     this.userServices.updateUser(this.props.loggedInUser._id, this.state.user)
    //         .then(theUser => this.setState({ user: theUser }))
    //         .catch(err => console.log(err))
    // }


    /*----EDIT PRODUCT----*/
    // updateProduct = () => {
    //     this.productServices.updateProduct(this.props.match.params.id, this.state.product)
    //         .then(theProduct => this.setState({ product: theProduct }))
    //         .catch(err => console.log(err))
    // }

    // handleSubmit = async e => {
    //     e.preventDefault()
    //     await this.setVariants()
    //     this.updateProduct()
    //     this.toggleToast()
    // }

    // handleChange = e => {
    //     let { name, value } = e.target
    //     this.setState({
    //         product: { ...this.state.product, [name]: value }
    //     })
    // }



    render() {

        return (

            <Container className="container-checkout">

                <Link to={`/login`}>Haz clic aquí para iniciar sesión</Link>

                <h1 className="mt-3 text-center">Finalizar compra</h1>
                <section className="mt-3">
                    <h5><strong>Dirección de envío</strong></h5>

                    <UserFormCheckout loggedInUser={this.props.loggedInUser} setTheUser={this.setTheUser} setTheCart={this.props.setTheCart} userCart={this.props.userCart} />
                </section>
                <section className="my-5">
                    <h5><strong>Carrito</strong></h5>
                    <TableContainer>
                        <Table style={{ padding: "5px" }} className="checkout-table" aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Imagen</TableCell>
                                    <TableCell align="center">Productos</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>
                                    <TableCell align="center">Precio unitario</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.userCart.products.length ? this.props.userCart.products.map((elm, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell><img src={elm.product.images[0]} alt={elm.name} /></TableCell>
                                        <TableCell><p>{elm.productName}</p><p className="checkout-model-size">{elm.modelSize}</p></TableCell>
                                        <TableCell align="center">
                                            <div className="d-flex align-items-center justify-content-center">
                                                {elm.quantity}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">{elm.price}€</TableCell>
                                        <TableCell align="right">{elm.subtotal}€</TableCell>
                                    </TableRow>
                                )) : <TableRow><TableCell colSpan={4}>Tu carrito está vacío</TableCell></TableRow>}
                                <TableRow>
                                    <TableCell colSpan={3}><p className="text-uppercase"><strong>Total</strong></p></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"><strong>{this.state.cart.total}€</strong></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </section>
                <section>
                    <h5><strong>Forma de pago</strong></h5>
                    <Link as="button" className="btn btn-warning btn-payment my-5" to="/#" onClick={this.props.handleClose}>Confirmar pago</Link>
                </section>


                <br></br><br></br><br></br><br></br><br></br>

            </Container>





            // <Container className="client-body">
            //     <h1 className="text-center text-uppercase">Carrito</h1>
            //     <TableContainer component={Paper}>
            //         <Table style={{ padding: "5px" }} aria-label="spanning table">
            //             <TableHead>
            //                 <TableRow>
            //                     <TableCell>Productos</TableCell>
            //                     <TableCell align="center">Cantidad</TableCell>
            //                     <TableCell align="center">Precio unitario</TableCell>
            //                     <TableCell align="right">Subtotal</TableCell>
            //                     <TableCell align="center"></TableCell>
            //                 </TableRow>
            //             </TableHead>
            //             <TableBody>
            //                 {this.props.userCart.products.map((elm, idx) => (
            //                     <TableRow key={idx}>
            //                         <TableCell>{elm.productName} | {elm.modelSize}</TableCell>
            //                         <TableCell align="center">
            //                             <div className="d-flex align-items-center justify-content-center">
            //                                 <IconButton onClick={() => this.handleQuantity('rest', idx)} aria-label="Restar cantidad">
            //                                     <RemoveCircleOutlineIcon />
            //                                 </IconButton>
            //                                 {elm.quantity}
            //                                 <IconButton onClick={() => this.handleQuantity('sum', idx)} aria-label="Sumar cantidad">
            //                                     <AddCircleOutlineIcon />
            //                                 </IconButton>
            //                             </div>
            //                         </TableCell>
            //                         <TableCell align="center">{elm.price}€</TableCell>
            //                         <TableCell align="right">{elm.subtotal}€</TableCell>
            //                         <TableCell align="center"><IconButton color="secondary" onClick={() => this.deleteFromCart(idx)} aria-label="Borrar">
            //                             <DeleteOutlinedIcon />
            //                         </IconButton></TableCell>
            //                     </TableRow>
            //                 ))}
            //                 <TableRow>
            //                     <TableCell colSpan={2}><strong>Total</strong></TableCell>
            //                     <TableCell align="right"></TableCell>
            //                     <TableCell align="right"><strong>{this.state.cart.total}€</strong></TableCell>
            //                 </TableRow>
            //             </TableBody>
            //         </Table>
            //     </TableContainer>
            // </Container>


        )
    }
}

export default Checkout