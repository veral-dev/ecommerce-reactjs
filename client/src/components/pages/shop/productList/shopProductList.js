import React, { Component } from 'react'

/* ----STYLING----*/
import '../shop.css';
// import './productList.css'

/* ----SERVICES----*/
import ProductsServices from '../../../../services/product.services'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import ProductCard from './productCardList'
// import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import Spinner from 'react-bootstrap/Spinner'

class ShopProductsList extends Component {


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

    handleChangeSearch = e => {
        let { value } = e.target
        this.searchProduct(value)
    }

    sortByPrice = () => {
        let productsCopy = [...this.state.products]
        productsCopy.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        this.setState({ products: productsCopy })
    }
    render() {

        return (

            <div className="client-body">
                <Container className="pb-5">

                    <Row className="mb-3">
                        <Col sm={8}>
                            <h1>Colección</h1>
                        </Col>
                        <Col sm={4}>

                            {this.props.loggedInUser.role === 'admin' && <Link className="float-right mobile-button" to="/admin/products/create">

                                <Fab style={{ backgroundColor: '#4caf50' }} aria-label="add">
                                    <AddIcon />
                                </Fab></Link>}
                        </Col>
                    </Row>
                    <input className="form-control mr-sm-2 mb-2" value={this.productsSearched} type="search" name="search" placeholder="Buscar" aria-label="Search"
                        id="index-input" onChange={this.handleChangeSearch} />

                    <div className="d-flex justify-content-between align-items-center">
                        <p className="m-0">{this.state.products.length} Artículos</p>
                        <div className="d-flex align-items-center"><p className="my-0 ml-5">Ordernar por nombre</p><IconButton onClick={this.sortByPrice}><FilterListIcon /></IconButton></div>
                    </div>

                    {this.state.products.length ? (

                        <Row className="my-2">
                            {this.state.products.map(elm => <ProductCard key={elm._id} {...elm} deleteProduct={() => this.deleteProduct(elm._id)} />)}
                        </Row>

                    )
                        :
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Cargando...</span>
                        </Spinner>

                    }

                </Container>
            </div>
        )
    }
}

export default ShopProductsList