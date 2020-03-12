import React, { Component } from 'react'

/* ----STYLING----*/
import '../shop.css'

/* ----SERVICES----*/
import ProductServices from '../../../../services/product.services'
import UserServices from '../../../../services/user.services'
import CartServices from '../../../../services/cart.services'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/* ----ICONS---- */
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class CartDetails extends Component {

    constructor(props) {
        super(props)
        this.productServices = new ProductServices()
        this.userServices = new UserServices()
        this.cartServices = new CartServices()

        this.state = {
            product: {
                name: '',
                excerpt: '',
                category: '',
                tags: '',
                images: [],
                model: [],
            },

            user: {

            },
            cart: {},
            modelPrev: [],
            choosedProduct: { product: '', model: '', quantity: 1 },
            showtoast: false,
            showmodal: false,
        }
    }


    componentDidMount = () => {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.userCart._id !== this.props.userCart._id || prevProps.userCart.cartIconQuantity !== this.props.userCart.cartIconQuantity) this.setState({ cart: this.props.userCart })
    }


    handleQuantity = (action, id) => {
        let cartCopy = { ...this.state.cart }
        let quantity = cartCopy.products[id].quantity || 0

        if (action === 'rest') { if (quantity > 1) { quantity-- } else { this.deleteFromCart(id) } } else { if (quantity < 10) { quantity++ } }

        if (cartCopy.products[id]) {
            cartCopy.products[id].quantity = quantity
            cartCopy.products[id].subtotal = cartCopy.products[id].price * quantity
            cartCopy.total = cartCopy.cartIconQuantity = 0
            cartCopy.products.forEach(elm => { cartCopy.total += elm.subtotal; cartCopy.cartIconQuantity += elm.quantity })
            this.updateCart(cartCopy)
        }

    }

    deleteFromCart = (id) => {
        let cartCopy = { ...this.state.cart }
        cartCopy.products.splice(id, 1)
        if (cartCopy.products.length === 0) { cartCopy.total = 0; cartCopy.cartIconQuantity = 0 }
        this.updateCart(cartCopy)


    }

    updateCart = (cart) => {
        this.cartServices.updateCart(this.state.cart._id, cart)
            .then(theCart => {
                this.setState({ cart: theCart }, () => this.props.setTheCart(this.state.cart))
            })
            .then(() => console.log(this.state.cart))
            .catch(err => console.log(err))
    }


    render() {

        return (
            <Container className="cart-body">
                <h1 className="text-center text-uppercase">Carrito</h1>
                <TableContainer>
                    <Table style={{ padding: "5px" }} className="cart-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Imagen</TableCell>
                                <TableCell colSpan={2}>Productos</TableCell>
                                <TableCell align="center">Precio unitario</TableCell>
                                <TableCell align="center">Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.userCart.products.length ? this.props.userCart.products.map((elm, idx) => (
                                <TableRow key={idx}>
                                    <TableCell><img src={elm.product.images[0]} alt={elm.name} /></TableCell>
                                    <TableCell><p>{elm.productName}</p><p className="cart-model-size">{elm.modelSize}</p></TableCell>
                                    <TableCell align="center">

                                    </TableCell>
                                    <TableCell align="center">{elm.price}€</TableCell>
                                    <TableCell align="right"><p><div className="d-flex align-items-center justify-content-center">
                                        <IconButton onClick={() => this.handleQuantity('rest', idx)} aria-label="Restar cantidad">
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                        {elm.quantity}
                                        <IconButton onClick={() => this.handleQuantity('sum', idx)} aria-label="Sumar cantidad">
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    </div></p><p className="text-center">{elm.subtotal}€</p></TableCell>
                                </TableRow>
                            )) : <TableRow><TableCell colSpan={4}>Tu carrito está vacío</TableCell></TableRow>}
                            <TableRow>
                                <TableCell colSpan={3}><strong>Total</strong></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="center"><strong>{this.state.cart.total}€</strong></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Link as="button" className="btn btn-outline-dark btn-checkout float-right" to="/finalizar-compra" onClick={this.props.handleClose}>Finalizar compra</Link>

            </Container>

        )
    }
}

export default CartDetails