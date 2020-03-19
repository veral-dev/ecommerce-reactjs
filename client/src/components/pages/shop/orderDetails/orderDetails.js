import React, { Component } from 'react'

/* ----STYLING----*/

/* ----SERVICES----*/
import ProductServices from '../../../../services/product.services'
import UserServices from '../../../../services/user.services'
import InvoiceServices from '../../../../services/invoice.services'


/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableContainer from '@material-ui/core/TableContainer'
import { Link } from 'react-router-dom'



class InvoiceDetails extends Component {

    constructor(props) {
        super(props)
        this.productServices = new ProductServices()
        this.invoiceServices = new InvoiceServices()
        this.userServices = new UserServices()

        this.state = {

            user: {},
            invoice: { products: [] },

            showtoast: false,
            showmodal: false,
        }
    }


    componentDidMount = () => {
        this.getInvoiceDetails()
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.loggedInUser._id !== this.props.loggedInUser._id) this.setState({ user: this.props.loggedInUser })
        // if (prevProps.userCart._id !== this.props.userCart._id || prevProps.userCart.cartIconQuantity !== this.props.userCart.cartIconQuantity) this.setState({ cart: this.props.userCart })
    }


    /*----LOAD PRODUCTS----*/
    getInvoiceDetails = () => {
        this.invoiceServices.getInvoiceDetails(this.props.location.search)
            .then(theInvoice => this.setState({ invoice: theInvoice }))
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Container className="client-body">

                <h1>Pedido completado</h1>
                <hr></hr>

                <Row className="my-3">
                    <Col md={6} xs={12}>
                        <h4 className="mb-4">Dirección de envío</h4>
                        <address>
                            <ul className="">
                                <li>{this.state.invoice.name}</li>
                                <li>{this.state.invoice.lastName}</li>
                                <li>{this.state.invoice.address1}</li>
                                <li>{this.state.invoice.address2}</li>
                                <li>{this.state.invoice.zipCode}</li>
                                <li>{this.state.invoice.city}</li>
                                <li>{this.state.invoice.phone}</li>
                            </ul>
                        </address>
                    </Col>
                    <Col md={6} xs={12}>
                        <h4>Productos</h4>
                        <TableContainer className="mb-5">
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
                                    {Array.isArray(this.state.invoice.products) && this.state.invoice.products.length ? this.state.invoice.products.map((elm, idx) => (
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
                                        <TableCell align="right"><strong>{this.state.invoice.total}€</strong></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Col>

                </Row>
                <Link as="button" className="p-2 my-2 btn btn-outline-warning" to="/">Volver a la tienda</Link>

            </Container>
        )

    }
}
export default InvoiceDetails

