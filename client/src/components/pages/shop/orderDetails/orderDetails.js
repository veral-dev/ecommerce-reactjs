import React, { Component } from 'react'

/* ----STYLING----*/

/* ----SERVICES----*/
import ProductServices from '../../../../services/product.services'
import UserServices from '../../../../services/user.services'
import InvoiceServices from '../../../../services/invoice.services'


/* ----STYLE COMPONENTS----*/
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'


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

        // this.invoiceServices.getInvoiceDetails(this.props.location.search)
        //     .then(theInvoice => this.setState({ invoice: theProduct, mainImage: theProduct.images[0], pricePrev: theProduct.model[0].price }))
        //     .then(() => this.setState({ modelPrev: [...this.state.product.model] }))
        //     .catch(err => console.log(err))
    }


    render() {
        return (
            <>
                <h1>Pedido completado</h1>
                {this.state.invoice.name}
                {this.state.invoice.lastName}
                {this.state.invoice.phone}

                {this.state.invoice.products.map((elm, idx) => <p>{elm.productName}</p>)}
            </>
        )

    }
}
export default InvoiceDetails

