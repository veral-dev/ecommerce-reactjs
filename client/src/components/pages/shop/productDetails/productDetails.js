import React, { Component } from 'react'

/* ----STYLING----*/
import '../shop.css'
import './productDetails.css'

/* ----SERVICES----*/
import ProductServices from '../../../../services/product.services'
import UserServices from '../../../../services/user.services'
import FilesServices from '../../../../services/files.services'
import CartServices from '../../../../services/cart.services'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

import Breadcrumbs from '../../../ui/Breadcrumbs'


/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Toast from 'react-bootstrap/Toast'
// import Table from 'react-bootstrap/Table'
// import Modal from 'react-bootstrap/Modal'
/* ----ICONS---- */
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class ProductUpdate extends Component {

    constructor(props) {
        super(props)
        this.productServices = new ProductServices()
        this.userServices = new UserServices()
        this.filesServices = new FilesServices()
        this.cartServices = new CartServices()

        this.state = {
            product: {
                name: '',
                excerpt: '',
                category: '',
                tags: '',
                images: [],
                model: [],
            },
            variant: {
                size: '',
                stock: 0,
                price: 0
            },
            user: {

            },
            cart: { _id: undefined, products: [], cartIconQuantity: 0 },
            modelPrev: [],
            choosedProduct: { product: '', model: '', price: 0, quantity: 1 },
            mainImage: '',
            showtoast: false,
            showmodal: false,
        }
    }

    componentDidMount = () => {
        this.getProductDetails()
        this.setState({ cart: this.props.userCart })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loggedInUser._id !== this.props.loggedInUser._id) this.setState({ user: this.props.loggedInUser })
        if (prevProps.userCart._id !== this.props.userCart._id) this.setState({ cart: this.props.userCart })
    }


    /*----LOAD PRODUCTS----*/
    getProductDetails = () => {
        this.productServices.getProductDetails(this.props.match.params.id)
            .then(theProduct => this.setState({ product: theProduct, mainImage: theProduct.images[0] }))
            .then(() => this.setState({ modelPrev: [...this.state.product.model] }))
            .catch(err => console.log(err))
    }
    /*----ADD TO CART----*/
    addToCart = () => {

        let cartCopy = { ...this.state.cart }
        if (cartCopy.total === 0) {
            cartCopy.products.push(this.state.choosedProduct)
        }
        else {
            let arr = []
            cartCopy.products.forEach(elm => arr.push(elm.model))
            if (arr.includes(this.state.choosedProduct.model)) {
                let idx = arr.indexOf(this.state.choosedProduct.model)
                cartCopy.products[idx].quantity += this.state.choosedProduct.quantity
                cartCopy.products[idx].subtotal = cartCopy.products[idx].quantity * cartCopy.products[idx].price
            } else {
                cartCopy.products.push(this.state.choosedProduct)
            }
        }

        let actualQuantity = 0
        cartCopy.total = 0
        cartCopy.products.forEach(elm => { actualQuantity += elm.quantity; cartCopy.total += elm.subtotal })
        cartCopy.cartIconQuantity = actualQuantity
        // this.setState({cart: cartCopy }, () => { this.updateCart(); this.props.setTheCart(this.state.cart)})
        this.updateCart(cartCopy)
    }

    updateCart = (cart) => {
        this.cartServices.updateCart(this.state.cart._id, cart)
            .then(theCart => {
                this.setState({ cart: theCart }, () => this.props.setTheCart(this.state.cart))
            })
            .catch(err => console.log(err))
    }

    updateUser = () => {
        let userCopy = this.state.user
        userCopy.cart = this.state.cart
        this.userServices.updateUser(this.props.loggedInUser._id, this.state.user)
            .then(theUser => this.setState({ user: theUser }))
            .catch(err => console.log(err))
    }

    chooseProduct = (idx, price, size) => {
        let productSubTotal = price * this.state.choosedProduct.quantity
        let choosedProductCopy = {
            product: this.state.product._id,
            model: idx,
            productName: this.state.product.name,
            modelSize: size,
            price: price,
            quantity: this.state.choosedProduct.quantity,
            subtotal: productSubTotal
        }
        this.setState({ choosedProduct: choosedProductCopy }, () => console.log(this.state.choosedProduct))
    }
    handleQuantity = (action) => {
        let quantity = this.state.choosedProduct.quantity
        if (action === 'rest') { if (quantity > 1) { quantity-- } } else { if (quantity < 10) { quantity++ } }
        let subtotal = this.state.choosedProduct.price * quantity
        this.setState({ choosedProduct: { ...this.state.choosedProduct, quantity: quantity, subtotal: subtotal } })

    }

    /*----EDIT PRODUCT----*/
    updateProduct = () => {
        this.productServices.updateProduct(this.props.match.params.id, this.state.product)
            .then(theProduct => this.setState({ product: theProduct }))
            .catch(err => console.log(err))
    }

    handleSubmit = async e => {
        e.preventDefault()
        await this.setVariants()
        this.updateProduct()
        this.toggleToast()
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            product: { ...this.state.product, [name]: value }
        })
    }

    handleChangeVariant = e => {
        let { name, value } = e.target
        this.setState({
            variant: { ...this.state.variant, [name]: value }
        })
    }

    handleUpdateVariant = e => {

        let { dataset } = e.target
        let id = dataset.id
        let modelCopy = [...this.state.modelPrev]

        const inputArray = document.getElementById(id).querySelectorAll('td input')
        let obj = {}
        inputArray.forEach(elm => obj[elm.name] = elm.value)

        modelCopy.splice(id, 1, obj)
        this.setState({
            modelPrev: modelCopy,
        })
    }

    handleSubmitVariant = e => {
        e.preventDefault()
        let modelCopy = [...this.state.product.model]
        modelCopy.push(this.state.variant)
        this.setState({
            modelPrev: modelCopy,
            variant: {
                size: '',
                stock: 0,
                price: 0
            },
            showmodal: false,
        })

    }

    setVariants = () => {
        console.log(this.state)
        let modelCopy = [...this.state.modelPrev]
        this.setState({
            product: { ...this.state.product, model: modelCopy },
        })

    }

    deleteVariant = idx => {
        let modelCopy = [...this.state.modelPrev]
        modelCopy.splice(idx, 1)
        this.setState({
            modelPrev: modelCopy
        })
    }

    handleFileUpload = e => {
        const uploadData = new FormData()
        for (let key in e.target.files) {
            uploadData.append("images", e.target.files[key])
        }
        this.filesServices.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    product: { ...this.state.product, images: response.secure_url }
                })
            })
            .catch(err => console.log(err))
    }




    toggleToast = () => this.setState({ showtoast: !this.state.showtoast })
    toggleModal = () => this.setState({ showmodal: !this.state.showmodal })

    mainImage = id => {

        let imageCopy = this.state.product.images[id.idx]
        // let idx = id.idx
        // imagesCopy.unshift(imagesCopy.splice(idx, 1).toString())
        this.setState({
            mainImage: imageCopy
        })

    }

    render() {
        return (

            <Container className="client-body">
                <Row >
                    <Col sm={12} md={6} className="product-img">
                        <img src={this.state.mainImage} style={{ width: "100%", height: "400px", padding: '5px', objectFit: 'cover' }} />
                        {this.state.product.images.map((elm, idx) => <img src={elm} key={idx} alt={idx} onClick={() => this.mainImage({ idx })} style={{ width: "100px", height: '100px', objectFit: 'cover', padding: '5px' }} />)}
                    </Col>
                    {/* TO-DO PREGUNTAR COMO HACER PARA QUE AL CAMBIAR LA PANTALLA CAMBIE YA QUE CREO QUE HAY QUE CAMBIAR EL ESTADO */}
                    {/* {window.innerWidth > 768 ? (<Col sm={12} md={6} className="product-img">
                        {this.state.product.images !== 0 ? this.state.product.images.map((elm, idx) => <img src={elm} key={idx} alt={idx} onClick={() => this.mainImage({ idx })} style={{ width: "100%" }} />) : 'No hay imágenes cargadas'}</Col>)
                        : (<Col sm={12} md={6}>
                            <img src={this.state.product.images[0]} style={{ width: "100%", height: "400px", padding: '5px', objectFit: 'cover' }} />
                            {this.state.product.images.map((elm, idx) => <img src={elm} key={idx} alt={idx} onClick={() => this.mainImage({ idx })} style={{ width: "100px", height: '100px', objectFit: 'cover', padding: '5px' }} />)}
                        </Col>)} */}

                    <Col sm={12} md={6} className="product-main">
                        <Breadcrumbs product={this.state.product.name} category={this.state.product.category} />
                        <h1>{this.state.product.name}</h1>
                        <p>{this.state.product.excerpt}</p>
                        {this.state.product.model.map((elm, idx) => <p key={elm.idx}>{elm.size}</p>)}
                        <div className="addToCart d-flex my-3">
                            <div className="quantity d-flex align-items-center">
                                <IconButton onClick={() => this.handleQuantity('rest')} aria-label="Restar cantidad">
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                {this.state.choosedProduct.quantity}
                                <IconButton onClick={() => this.handleQuantity('sum')} aria-label="Sumar cantidad">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                            <Button variant="warning" size="medium" onClick={() => this.addToCart(this.state.product._id)}>Comprar producto</Button>
                        </div>
                    </Col>
                </Row>


            </Container>




            // <Container className="client-body">
            //     <Breadcrumbs product={this.state.product.name} category={this.state.product.category} />
            //     <h1>{this.state.product.name}</h1>

            //     <Form onSubmit={this.handleSubmit}>
            //         <Form.Group>
            //             <Form.Label>Nombre</Form.Label>
            //             <Form.Control type="text" name="name" value={this.state.product.name} onChange={this.handleChange} />
            //         </Form.Group>
            //         <Form.Group>
            //             <Form.Label>Descripción corta</Form.Label>
            //             <Form.Control type="text" name="excerpt" value={this.state.product.excerpt} onChange={this.handleChange} />
            //         </Form.Group>
            //         <Form.Group>
            //             <Form.Label>Categoría</Form.Label>
            //             <Form.Control type="text" name="category" value={this.state.product.category} onChange={this.handleChange} />
            //         </Form.Group>
            //         <Form.Group>
            //             <Form.Label>Etiquetas de búsqueda</Form.Label>
            //             <Form.Control type="text" name="tags" value={this.state.product.tags} onChange={this.handleChange} />
            //         </Form.Group>
            //         <Form.Group>
            //             <Form.Label>Imágenes</Form.Label>
            //             <Form.Control type="file" name="images" onChange={this.handleFileUpload} multiple />
            //             {this.state.product.images !== 0 ? this.state.product.images.map((elm, idx) => <img className="m-3" src={elm} key={idx} alt={idx} onClick={() => this.mainImage({ idx })} style={{ width: "50px" }} />) : 'No hay imágenes cargadas'}
            //         </Form.Group>
            //     </Form>
            //     <Modal show={this.state.showmodal} onHide={this.toggleModal}>
            //         <Modal.Body>
            //             <Form onSubmit={this.handleSubmitVariant}>
            //                 <Form.Group>
            //                     <Form.Label>Medida</Form.Label>
            //                     <Form.Control type="text" name="size" value={this.state.variant.size} onChange={this.handleChangeVariant} />
            //                 </Form.Group>
            //                 <Form.Group>
            //                     <Form.Label>Price</Form.Label>
            //                     <Form.Control type="number" name="price" value={this.state.variant.price} onChange={this.handleChangeVariant} />
            //                 </Form.Group>
            //                 <Form.Group>
            //                     <Form.Label>Stock</Form.Label>
            //                     <Form.Control type="number" name="stock" value={this.state.variant.stock} onChange={this.handleChangeVariant} />
            //                 </Form.Group>
            //                 <Button variant="dark" type="submit">Añadir nueva variante al producto</Button>
            //             </Form>
            //         </Modal.Body>
            //     </Modal>
            //     <h3>Variaciones</h3>
            //     <Button className="mb-20" variant="outline-dark" onClick={this.toggleModal}>Crear nueva variación</Button>

            //     <Table responsive striped bordered>
            //         <thead>
            //             <tr>
            //                 <th>#</th>
            //                 <th>Size</th>
            //                 <th>Stock</th>
            //                 <th>Price</th>
            //                 <th>Action</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {this.state.modelPrev.map((elm, idx) =>
            //                 <tr id={idx} key={idx}>
            //                     <td>{idx + 1}</td>
            //                     <td><input type="text" name="size" data-id={idx} value={elm.size} onChange={this.handleUpdateVariant} /></td>
            //                     <td><input type="number" name="stock" data-id={idx} value={elm.stock} onChange={this.handleUpdateVariant} /></td>
            //                     <td><input type="number" name="price" data-id={idx} value={elm.price} onChange={this.handleUpdateVariant} /></td>
            //                     {/* <td><input type="number" name="quantity" value={this.state.choosedProduct.quantity} /></td> */}
            //                     <td><Button className="mb-20" variant="outline-danger" onClick={() => this.deleteVariant(idx)}>Borrar</Button></td>
            //                     <td><Button className="mb-20" variant="outline-warning" onClick={() => this.chooseProduct(elm._id, elm.price, elm.size)}>Elegir</Button></td>

            //                 </tr>
            //             )}
            //         </tbody>
            //     </Table>







            //     <Button variant="outline-success" type="submit" size="lg" block onClick={this.handleSubmit}>Modificar producto</Button>

            //     <Toast onClose={() => this.toggleToast()} show={this.state.showtoast} delay={10000} autohide>
            //         <Toast.Header>
            //             <strong className="mr-auto">El producto ha sido modificado</strong>
            //         </Toast.Header>
            //     </Toast>
            //     <Button as="div" variant="dark" size="sm">
            //         <Link to="/admin/products/products-list">Volver al listado de productos</Link>
            //     </Button>

            //     <div className="addToCart d-flex my-3 float-right">
            //         <div className="quantity d-flex align-items-center">
            //             <IconButton onClick={() => this.handleQuantity('rest')} aria-label="Restar cantidad">
            //                 <RemoveCircleOutlineIcon />
            //             </IconButton>
            //             {this.state.choosedProduct.quantity}
            //             <IconButton onClick={() => this.handleQuantity('sum')} aria-label="Sumar cantidad">
            //                 <AddCircleOutlineIcon />
            //             </IconButton>
            //         </div>
            //         <Button variant="warning" size="medium" onClick={() => this.addToCart(this.state.product._id)}>Comprar producto</Button>
            //     </div>

            // </Container>


        )
    }
}

export default ProductUpdate