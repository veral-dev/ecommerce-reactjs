import React, { Component } from 'react'

import ProductForm from '../productForm/productForm'
import Container from 'react-bootstrap/Container'


class CreateProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            showmodal: false
        }
    }

    render() {

        return (
            <div className="admin-body">
                <Container>
                    <h1 className="text-center">Panel de creación de producto</h1>
                    <ProductForm />
                </Container>
            </div>
        )
    }
}

export default CreateProduct