import React, { Component } from 'react'

/* ----SERVICES----*/
import AuthServices from '../../../../services/auth.services'

/* ----STYLE COMPONENTS----*/
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
        this.authServices = new AuthServices()
    }


    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    postUser = () => {
        this.authServices.signup(this.state)
            .then(theLoggedNewUser => {
                this.setState({ email: '', password: '' })
                this.props.setTheUser(theLoggedNewUser)
            })
            .catch(err => console.log({ err }))
    }

    handleSubmit = e => {
        e.preventDefault()
        //Validación en front, TO-DO
        // if (this.state.password.length < 6 || !this.state.email.match(/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/)) {
        //     this.setState({ errorMessage: 'RELLENA LOS CAMPOS' })
        //     return
        // }
        this.postUser()
    }


    render() {

        return (

            <Container>

                <h1>Registro de usuarios</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" pattern=".{6,}" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">Registrarse</Button>
                </Form>
                <p>{this.state.errorMessage}</p>
            </Container>

        )
    }
}

export default Signup