import React, { Component } from 'react'

/* ----STYLING----*/
import '../shop.css'

/* ----SERVICES----*/
import UserServices from '../../../../services/user.services'

/* ----ROUTES----*/
// import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Toast from 'react-bootstrap/Toast'
// import Table from 'react-bootstrap/Table'
// import Modal from 'react-bootstrap/Modal'
import TextField from '@material-ui/core/TextField';



class UserUpdate extends Component {
    constructor(props) {
        super(props)
        this.userServices = new UserServices()
        this.state = {
            user: {
                email: '',
                role: '',
                name: '',
                lastName: '',
                street: '',
                zipCode: '',
                city: '',
                state: '',
                phone: '',
                wishlist: [],
                orders: [],
            },
            modelPrev: [],
            showtoast: false,
            showmodal: false,
        }
    }

    componentDidMount = () => {
        this.getUserDetails()
    }

    getUserDetails = () => {
        this.userServices.getUserDetails(this.props.loggedInUser._id)
            .then(theUser => this.setState({ user: theUser }))
            .catch(err => console.log(err))
    }

    updateUser = () => {
        this.userServices.updateUser(this.props.loggedInUser._id, this.state.user)
            .then(theUser => this.setState({ user: theUser }))
            .catch(err => console.log(err))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.updateUser()
        this.toggleToast()
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            user: { ...this.state.user, [name]: value }
        })
    }

    // deleteVariant = idx => {
    //     let modelCopy = [...this.state.modelPrev]
    //     modelCopy.splice(idx, 1)
    //     this.setState({
    //         modelPrev: modelCopy
    //     })
    // }

    toggleToast = () => this.setState({ showtoast: !this.state.showtoast })
    toggleModal = () => this.setState({ showmodal: !this.state.showmodal })


    render() {

        return (
            <Container className="client-body">

                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField className="mx-4" id="standard-basic" value={this.state.user.name} label="Nombre" type="text" name="name" onChange={this.handleChange} />
                    <TextField className="mx-4" id="standard-basic" value={this.state.user.lastName} label="Apellidos" type="text" name="lastName" onChange={this.handleChange} />
                    <TextField className="mx-4" id="standard-basic" value={this.state.user.role} label="Rol" type="text" name="role" onChange={this.handleChange} />
                    <TextField className="mx-4" id="standard-basic" value={this.state.user.city} label="Ciudad" type="text" name="city" onChange={this.handleChange} />

                </form>
                <Button variant="outline-success" type="submit" size="lg" block onClick={this.handleSubmit}>Modificar usuario</Button>

                {/* <h1>{this.state.product.name}</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="name" value={this.state.product.name} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción corta</Form.Label>
                        <Form.Control type="text" name="excerpt" value={this.state.product.excerpt} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control type="text" name="category" value={this.state.product.category} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Etiquetas de búsqueda</Form.Label>
                        <Form.Control type="text" name="tags" value={this.state.product.tags} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Imágenes</Form.Label>
                        <Form.Control type="file" name="images" onChange={this.handleFileUpload} multiple />
                        {this.state.product.images !== 0 ? this.state.product.images.map((elm, idx) => <img className="m-3" src={elm} key={idx} alt={idx} onClick={() => this.mainImage({ idx })} style={{ width: "50px" }} />) : 'No hay imágenes cargadas'}
                    </Form.Group>
                </Form>
                <Modal show={this.state.showmodal} onHide={this.toggleModal}>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmitVariant}>
                            <Form.Group>
                                <Form.Label>Medida</Form.Label>
                                <Form.Control type="text" name="size" value={this.state.variant.size} onChange={this.handleChangeVariant} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={this.state.variant.price} onChange={this.handleChangeVariant} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" name="stock" value={this.state.variant.stock} onChange={this.handleChangeVariant} />
                            </Form.Group>
                            <Button variant="dark" type="submit" onSubmit={this.handleSubmitVariant}>Añadir nueva variante al producto</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <h3>Variaciones</h3>
                <Button className="mb-20" variant="outline-dark" onClick={this.toggleModal}>Crear nueva variación</Button>

                <Table responsive striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Size</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.modelPrev.map((elm, idx) =>
                            <tr id={idx} key={idx}>
                                <td>{idx + 1}</td>
                                <td><input type="text" name="size" data-id={idx} value={elm.size} onChange={this.handleUpdateVariant} /></td>
                                <td><input type="text" name="stock" data-id={idx} value={elm.stock} onChange={this.handleUpdateVariant} /></td>
                                <td><input type="text" name="price" data-id={idx} value={elm.price} onChange={this.handleUpdateVariant} /></td>
                                <td><Button className="mb-20" variant="outline-danger" onClick={() => this.deleteVariant(idx)}>Borrar</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>







                <Button variant="outline-success" type="submit" size="lg" block onClick={this.handleSubmit}>Modificar producto</Button>

                <Toast onClose={() => this.toggleToast()} show={this.state.showtoast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">El usuario ha sido modificado correctamente</strong>
                    </Toast.Header>
                </Toast>
                <Button as="div" variant="dark" size="sm">
                    <Link to="/">Volver a tu cuenta</Link>
                </Button> */}

            </Container>


        )
    }
}

export default UserUpdate