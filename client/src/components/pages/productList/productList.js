import React, { Component } from 'react'

import ProductsServices from '../../../services/product.services'

import ProductCard from './productCardList'
import { Link } from 'react-router-dom'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'

class ProductsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            showmodal: false
        }
        this.services = new ProductsServices()
    }

    componentDidMount = () => this.getAllProducts()

    getAllProducts = () => {
        this.services.getAllProducts()
            .then(allProducts => this.setState({ products: allProducts }))
            .catch(err => console.log(err))
    }

    // closeModal = () => this.setState({ showmodal: false })
    // openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                <h1>Productos</h1>

                {this.props.loggedInUser && <Link as="button" className="mb-20 p-2 btn-dark" to="/products/create">Crear nuevo producto</Link>}

                {this.state.products.length ? (
                    <Row>
                        {this.state.products.map(elm => <ProductCard key={elm._id} {...elm} />)}
                    </Row>
                )
                    :
                    <p>CARGANDO...</p>

                }

            </Container>
        )
    }
}

export default ProductsList