import React, { Component } from 'react'

/* ----STYLING----*/
import './aside.css';
// import './productList.css'

/* ----SERVICES----*/
import ProductsServices from '../../../../services/product.services'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import ProductCard from '../productList/productCardList'
// import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Spinner from 'react-bootstrap/Spinner'

class AsideUpsells extends Component {


    constructor(props) {
        super(props)
        this.state = {
            products: [],
        }
        this.productServices = new ProductsServices()
    }

    componentDidMount = () => this.getAllProducts()

    getAllProducts = () => {
        this.productServices.getAllProducts()
            .then(allProducts => this.setState({ products: allProducts.splice(0, 4) }))
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

    render() {

        return (

            <aside className="main-aside">


                <h4>También te podría interesar</h4>


                {this.state.products.length ? (

                    <Row className="my-2">
                        {this.state.products.map(elm => <ProductCard key={elm._id} {...elm} deleteProduct={() => this.deleteProduct(elm._id)} />)}
                    </Row>

                )
                    :
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Cargando...</span>
                    </Spinner>}

            </aside>
        )
    }
}

export default AsideUpsells