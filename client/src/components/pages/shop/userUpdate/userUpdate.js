import React, { Component } from 'react'

/* ----STYLING----*/
import '../shop.css'

/* ----SERVICES----*/
import UserServices from '../../../../services/user.services'

/* ----ROUTES----*/
// import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import Toast from 'react-bootstrap/Toast'

class UserUpdate extends Component {
    constructor(props) {
        super(props)
        this.userServices = new UserServices()
        this.state = {
            user: {
                email: '',
                name: '',
                lastName: '',
                address1: '',
                address2: '',
                zipCode: '',
                city: '',
                state: '',
                country: '',
                phone: '',
            },
            modelPrev: [],
            showtoast: false,
            showmodal: false,
        }
    }

    componentDidMount = () => {
        if (this.props.loggedInUser._id) this.setState({ user: this.props.loggedInUser })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedInUser._id !== this.props.loggedInUser._id) this.setState({ user: this.props.loggedInUser })
    }

    getUserDetails = () => {
        this.userServices.getUserDetails(this.props.loggedInUser._id)
            .then(theUser => this.setState({ user: theUser }))
            .catch(err => console.log(err))
    }

    updateUser = () => {
        this.userServices.updateUser(this.props.loggedInUser._id, this.state.user)
            .then(theUser => this.setState({ user: theUser }))
            .then(() => this.props.setTheUser(this.state.user))
            .catch(err => console.log(err))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.updateUser()
        this.toggleToast()
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            user: { ...this.state.user, [name]: value }
        }, () => this.props.setTheUser(this.state.user))

    }

    toggleToast = () => this.setState({ showtoast: !this.state.showtoast })
    toggleModal = () => this.setState({ showmodal: !this.state.showmodal })


    render() {

        return (
            <Container className="client-body container-form my-2">
                <h1>Editar cuenta</h1>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="name" id="name" required placeholder="Nombre" value={this.state.user.name} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control type="text" name="lastName" id="lastName" required placeholder="Apellidos" value={this.state.user.lastName} onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" name="email" id="email" required placeholder="Correo electrónico" value={this.state.user.email} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control name="phone" id="phone" required placeholder="Teléfono" value={this.state.user.phone} onChange={this.handleChange} />
                        </Form.Group>

                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" name="address1" id="address1" required placeholder="Dirección de envío" value={this.state.user.address1} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Más información para el envío</Form.Label>
                        <Form.Control type="text" name="address2" id="address2" required placeholder="Información adicional para el envío" value={this.state.user.address2} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Código postal</Form.Label>
                            <Form.Control type="text/number" name="zipCode" id="zipCode" required placeholder="Código postal" value={this.state.user.zipCode} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Provincia/Región</Form.Label>
                            <Form.Control type="text" name="state" id="state" required placeholder="Provincia o región" value={this.state.user.state} onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" name="city" id="city" required placeholder="Ciudad" value={this.state.user.city} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>País</Form.Label>
                            <Form.Control type="text" name="country" id="country" required placeholder="País" value={this.state.user.country} onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>

                    <Button type="submit" onClick={this.handleSubmit} variant="outlined" className="mt-4" size="small" startIcon={<SaveIcon />}>
                        Guardar dirección
                    </Button>
                    <Toast style={{ backgroundColor: "green" }} onClose={() => this.toggleToast()} show={this.state.showtoast} delay={10000} autohide>
                        <Toast.Header>
                            <strong className="mr-auto">La información ha sido modificada</strong>
                        </Toast.Header>
                    </Toast>
                </Form>

            </Container>

        )
    }
}

export default UserUpdate