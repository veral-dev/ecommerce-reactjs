import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import AuthServices from '../../services/auth.services'

import { Link } from 'react-router-dom'


import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cartMenu: false,
        }
        this.authServices = new AuthServices()
    }

    logout = () => {
        this.authServices.logout()
            .then(response => {
                this.props.setTheUser(false)
            })
            .catch(err => console.log(err))
    }


    render() {

        const greeting = this.props.loggedInUser ? <>Hola, {this.props.loggedInUser.name}</> : <>Hola, invitad@</>


        return (


            this.props.loggedInUser ?
                (
                    <>
                        <Navbar bg="dark" expand="lg" variant="dark">
                            <Navbar.Brand href="#home">Relakso e-Commerce</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                    <Nav.Link as="div"> <Link to="/profile">Perfil</Link></Nav.Link>
                                    <Nav.Link as="div"> <Link to="/admin/products/create">Crear producto</Link></Nav.Link>
                                    <Nav.Link as="div"> <Link to="/admin/products/products-list">Lista de productos</Link></Nav.Link>
                                    <Nav.Link as="div"> <Link to="/admin/users/users-list">Lista de usuarios</Link></Nav.Link>
                                    <Nav.Link as="div"> <Link to="/admin/users/create-user">Crear usuario</Link></Nav.Link>
                                    <Nav.Link as="div"> <Link to="/cuenta/editar">Editar mi cuenta</Link></Nav.Link>
                                    <Nav.Link onClick={this.logout}>Cerrar sesión</Nav.Link>
                                    <Nav.Link as="div">{greeting}</Nav.Link>
                                    <Button aria-controls="fade-menu" aria-haspopup="false">
                                        Open cart{this.state.cartMenu}
                                    </Button>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                        <Menu
                            id="fade-menu"
                            anchorEl='true'
                            open={this.state.cartMenu}
                        >
                            <p>holasdaiohfejbwefjlflkfdklndfaldklnfklnd adfkfaddf dfoadf nadf ofojan kafoi hefon adfoknadfn  </p>
                            <MenuItem >Profile</MenuItem>
                            <MenuItem >My account</MenuItem>
                            <MenuItem >Logout</MenuItem>
                        </Menu>
                    </>
                )
                :
                (
                    <Navbar bg="dark" expand="lg" variant="dark">
                        <Navbar.Brand href="#home">Relakso e-Commerce</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/signup">Registro</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/login">Inicio sesión</Link></Nav.Link>
                                <Nav.Link as="div">{greeting}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )


        )
    }
}

export default Navigation