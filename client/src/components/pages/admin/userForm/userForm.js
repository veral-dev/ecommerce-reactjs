import React, { Component } from 'react'

/* ----STYLING----*/
import '../admin.css';
import './userForm.css';

/* ----SERVICES----*/
import UserServices from '../../../../services/user.services'

/* ----STYLE COMPONENTS----*/
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class UserForm extends Component {

    constructor(props) {
        super(props)
        this.UserServices = new UserServices()
        this.state = {
            user: {
                name: '',
                lastName: '',
                role: '',
                street: '',
                zipCode: '',
                city: '',
                state: '',
                phone: '',
            },

        }
    }

    finishAction = () => {
        this.setState({
            user: {
                name: '',
                lastName: '',
                role: '',
                street: '',
                zipCode: '',
                city: '',
                state: '',
                phone: '',
            },
        })
    }

    postUser = () => {
        this.UserServices.postUser(this.state.user)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            user: { ...this.state.user, [name]: value }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postUser()
    }

    // deleteVariant = idx => {
    //     let modelCopy = [...this.state.product.model]
    //     modelCopy.splice(idx, 1)
    //     this.setState({
    //         product: { ...this.state.product, model: modelCopy }
    //     })
    // }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {
        return (
            <div className="py-5 create-product">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="name" value={this.state.user.name} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control type="text" name="lastName" value={this.state.user.lastName} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rol</Form.Label>
                        <Form.Control type="text" name="role" value={this.state.user.role} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control type="text" name="city" value={this.state.user.city} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Código postal</Form.Label>
                        <Form.Control type="text" name="zipCode" value={this.state.user.zipCode} onChange={this.handleChange} />
                    </Form.Group>

                </Form>
                {/* 

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
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
                <Button className="mb-20" variant="outline-light" onClick={this.openModal}>Crear nueva variación</Button>

                <Table striped bordered>
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
                        {this.state.product.model.map((elm, idx) =>
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{elm.size}</td>
                                <td>{elm.stock}</td>
                                <td>{elm.price}€</td>
                                <td><Button className="mb-20" variant="outline-danger" onClick={() => this.deleteVariant(idx)}>Borrar</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <hr></hr> */}
                <Button variant="outline-success" type="submit" size="lg" block onClick={this.handleSubmit}>Crear nuevo usuario</Button>
            </div>
        )
    }
}

export default UserForm