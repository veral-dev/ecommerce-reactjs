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
import AsideProductMain from '../aside/asideProduct'
import AsideUpsells from '../aside/asideUpsells'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Breadcrumbs from '../../../ui/Breadcrumbs'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

/* ----ICONS---- */
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

class ProductDetails extends Component {

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
            pricePrev: 0,
            choosedProduct: { product: '', model: '', price: 0, quantity: 1 },
            productSelected: '',
            mainImage: '',
            showtoast: false,
            showmodal: false,
            errMessage: ''
        }
    }

    componentDidMount = () => {
        this.getProductDetails()
        this.setState({ cart: this.props.userCart })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loggedInUser._id !== this.props.loggedInUser._id) this.setState({ user: this.props.loggedInUser })
        if (prevProps.userCart._id !== this.props.userCart._id || prevProps.userCart.cartIconQuantity !== this.props.userCart.cartIconQuantity) this.setState({ cart: this.props.userCart })
    }


    /*----LOAD PRODUCTS----*/
    getProductDetails = () => {
        this.productServices.getProductDetails(this.props.match.params.id)
            .then(theProduct => this.setState({ product: theProduct, mainImage: theProduct.images[0], pricePrev: theProduct.model[0].price }))
            .then(() => this.setState({ modelPrev: [...this.state.product.model] }))
            .catch(err => console.log(err))
    }

    /*----ADD TO CART----*/
    addToCart = () => {
        if (!this.state.choosedProduct.product) return this.setState({ errMessage: 'Selecciona tu medida' }, () => this.toggleToast())
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
        if (this.state.choosedProduct.model) document.getElementById(this.state.choosedProduct.model).classList.toggle("selected")
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
        this.setState({ choosedProduct: choosedProductCopy, pricePrev: price }, () => document.getElementById(this.state.choosedProduct.model).classList.toggle("selected"))
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
        this.setState({
            mainImage: imageCopy
        })

    }

    render() {
        return (
            <>
                <Container className="client-body">
                    {this.props.loggedInUser.role === 'admin' && <Link className="float-right edit-button" to={`/admin/editar-producto/${this.state.product._id}`}>
                        <Fab style={{ backgroundColor: '#fdd100' }} aria-label="edit">
                            <EditIcon />
                        </Fab><p className="edit-text">Editar</p></Link>}

                    <Row >
                        <Col sm={12} md={6} className="product-img">
                            <img src={this.state.mainImage} alt={this.state.product.name} style={{ width: "100%", height: "400px", padding: '5px', objectFit: 'cover' }} />
                            {this.state.product.images.map((elm, idx) => <img src={elm} key={idx} alt={idx} onClick={() => this.mainImage({ idx })} style={{ width: "100px", height: '100px', objectFit: 'cover', padding: '5px' }} />)}
                        </Col>

                        <Col sm={12} md={6} className="product-main">
                            <Breadcrumbs product={this.state.product.name} category={this.state.product.category} />
                            <h1>{this.state.product.name}</h1>
                            <p className="product-price">{this.state.pricePrev} €</p>
                            <p>{this.state.product.excerpt}</p>
                            <p className="size-details">Selecciona medida</p>
                            <hr></hr>
                            {this.state.product.model.map((elm, idx) => (
                                <Button key={idx} className="product-selection" id={elm._id} variant="outline" onClick={() => this.chooseProduct(elm._id, elm.price, elm.size)}>{elm.size}</Button>
                            ))}

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

                                <Button variant="warning" className="add-cart-btn" onClick={() => this.addToCart(this.state.product._id)}>Añadir al carrito</Button>

                            </div>
                            <Toast onClose={() => this.toggleToast()} show={this.state.showtoast} delay={10000} autohide>
                                <Toast.Header>
                                    <strong className="mr-auto">{this.state.errMessage}</strong>
                                </Toast.Header>
                            </Toast>

                        </Col>
                    </Row>


                </Container>
                <AsideProductMain />
                <AsideUpsells numberOfProducts="4" />


            </>

        )
    }
}

export default ProductDetails