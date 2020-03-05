import React, { Component } from 'react'

/* ----STYLE COMPONENTS----*/
import UserForm from '../userForm/userForm'
import Container from 'react-bootstrap/Container'


class CreateUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            showmodal: false
        }
    }

    render() {

        return (
            <div className="admin-body">
                <Container>
                    <h1 className="text-center">Panel de creación de usuario</h1>
                    <UserForm />
                </Container>
            </div>
        )
    }
}

export default CreateUser