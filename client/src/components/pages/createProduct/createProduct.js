import React, { Component } from 'react'

import ProductForm from '../productForm/productForm'


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
            <>
                <h1 className="text-center">Panel de creación de producto</h1>
                <ProductForm />
            </>
        )
    }
}

export default CreateProduct