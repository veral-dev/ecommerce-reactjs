import React, { Component } from 'react'

/* ----SERVICES----*/
import AuthServices from '../../../../services/auth.services'

/* ----STYLE COMPONENTS----*/
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.authServices = new AuthServices()
    }


    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    postUser = () => {
        this.authServices.login(this.state)
            .then(theLoggedUser => {
                this.setState({ email: '', password: '' })
                this.props.setTheUser(theLoggedUser)
                this.props.history.push('/')
            })
            .catch(err => console.log({ err }))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postUser()
    }


    render() {

        return (

            <Container>

                <h1>Inicio de sesión</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>

                    <Button variant="dark" type="submit">Iniciar sesión</Button>
                </Form>
            </Container>

        )
    }
}

export default Login