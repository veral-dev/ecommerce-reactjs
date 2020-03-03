import React, { Component } from 'react'

import ProductForm from './productForm/productForm'


import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            showmodal: false
        }
    }

    // componentDidMount = () => this.getAllCoasters()

    // getAllCoasters = () => {
    //     this.services.getAllCoasters()
    //         .then(allCoasters => this.setState({ coasters: allCoasters }))
    //         .catch(err => console.log(err))
    // }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                <h1>Bienvenido a Relakso</h1>

                {this.props.loggedInUser && <Link as="button" className="mb-20 p-2 btn-dark" to="/products/create">Crear nuevo producto</Link>}

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Nuevo producto</h3>
                        <hr></hr>
                        <ProductForm closeModal={this.closeModal} />
                        {/* <CoasterForm closeModal={this.closeModal} refreshList={this.getAllCoasters} /> */}
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default Home