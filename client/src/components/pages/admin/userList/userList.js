import React, { Component } from 'react'

/* ----STYLING----*/
import '../admin.css';

/* ----SERVICES----*/
import ProductsServices from '../../../../services/user.services'

/* ----COMPONENTS----*/
import UserCard from './userCardList'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class UserList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            showmodal: false
        }
        this.productServices = new ProductsServices()
    }

    componentDidMount = () => this.getAllUsers()

    getAllUsers = () => {
        this.productServices.getAllUsers()
            .then(allUsers => this.setState({ users: allUsers }))
            .catch(err => console.log(err))
    }

    // closeModal = () => this.setState({ showmodal: false })
    // openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <div className="admin-body">
                <Container className="pb-5">

                    <Row>
                        <Col sm={8}>
                            <h1>Listado de usuarios</h1>
                        </Col>
                        <Col sm={4}>
                            {this.props.loggedInUser && <Link as="button" className="mb-20 p-2 btn btn-outline-warning" to="/admin/users/create">Crear nuevo usuario</Link>}
                        </Col>
                    </Row>




                    {this.state.users.length ? (

                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Nombre</th>
                                    <th>Ciudad</th>
                                    <th>Teléfono</th>
                                    <th>Rol</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(elm => <UserCard key={elm._id} {...elm} />)}
                            </tbody>
                        </Table>

                    )
                        :
                        <p>CARGANDO...</p>

                    }

                </Container>
            </div>
        )
    }
}

export default UserList