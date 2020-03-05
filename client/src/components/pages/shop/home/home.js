import React, { Component } from 'react'

/* ----COMPONENTS----*/
import ProductForm from '../../admin/productForm/productForm'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            showmodal: false
        }
    }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                <h1>Bienvenido a Relakso</h1>

                {this.props.loggedInUser && <Link as="button" className="mb-20 p-2 btn btn-info" to="/admin/products/create">Crear nuevo producto</Link>}

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Nuevo producto</h3>
                        <hr></hr>
                        <ProductForm closeModal={this.closeModal} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default Home