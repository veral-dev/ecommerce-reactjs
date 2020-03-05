import React, { Component } from 'react'

/* ----STYLING----*/
import '../admin.css';

/* ----SERVICES----*/
import ProductsServices from '../../../../services/product.services'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import ProductCard from './productCardList'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'

class ProductsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            showmodal: false,
        }
        this.productServices = new ProductsServices()
    }

    componentDidMount = () => this.getAllProducts()

    getAllProducts = () => {
        this.productServices.getAllProducts()
            .then(allProducts => this.setState({ products: allProducts }))
            .catch(err => console.log(err))
    }

    deleteProduct = (id) => {
        this.productServices.deleteProduct(id)
            .then(() => this.getAllProducts())
            .catch(err => console.log(err))
    }

    searchProduct = (value) => {
        this.productServices.searchProduct(value)
            .then(allProducts => this.setState({ products: allProducts }))
            .catch(err => console.log(err))
    }

    handleChangeVariant = e => {
        let { value } = e.target
        this.searchProduct(value)
    }

    render() {

        return (
            <div className="admin-body">
                <Container className="pb-5">

                    <Row>
                        <Col sm={8}>
                            <h1>Listado de productos</h1>
                        </Col>
                        <Col sm={4}>
                            {this.props.loggedInUser && <Link as="button" className="mb-20 p-2 btn btn-outline-warning" to="/admin/products/create">Crear nuevo producto</Link>}
                        </Col>
                    </Row>
                    <input className="form-control mr-sm-2" value={this.productsSearched} type="search" name="search" placeholder="Search" aria-label="Search"
                        id="index-input" onChange={this.handleChangeVariant} />

                    {this.state.products.length ? (

                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map(elm => <ProductCard key={elm._id} {...elm} deleteProduct={() => this.deleteProduct(elm._id)} />)}
                            </tbody>
                        </Table>

                    )
                        :
                        <p>No hay resultados...</p>

                    }

                </Container>
            </div>
        )
    }
}

export default ProductsList