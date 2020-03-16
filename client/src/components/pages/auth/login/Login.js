import React, { Component } from 'react'

/* ----STYLE----*/
import '../auth.css'

/* ----SERVICES----*/
import AuthServices from '../../../../services/auth.services'

/* ----STYLE COMPONENTS----*/
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Toast from 'react-bootstrap/Toast'


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            showError: false,
            userCart: { products: [], total: 0, cartIconQuantity: 0 },
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
                theLoggedUser.cart ? this.props.fetchCart(theLoggedUser.cart) : this.props.postCart(this.state.userCart)
                this.props.history.goBack()
            })
            .catch(err => this.setState({ errorMessage: err.response.data.message },
                () => { this.toggle("showError") }))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postUser()

    }

    toggle = (component) => this.setState({ [component]: !this.state[component] })

    render() {

        return (

            <Container maxWidth="xs">
                <div className="paper">

                    <Avatar className="avatar" style={{ backgroundColor: '#fdd100' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="text" value={this.state.email} onChange={this.handleChange}
                            inputProps={{ title: "Tu correo debe incluir @ y un dominio. Ej: .com, .es...", pattern: "[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}" }}
                        />
                        <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Contraseña" type="password" id="password"
                            inputProps={{ title: "Tu contraseña debe incluir más de 6 caracteres", pattern: ".{6,}" }}
                            autoComplete="current-password" value={this.state.password} onChange={this.handleChange} />

                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="No cerrar sesión" />

                        <Button type="submit" fullWidth variant="contained" color="primary" className="my-3">
                            Iniciar sesión
                        </Button>
                        <Grid container>
                            
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"¿No tienes cuenta? Crear una nueva cuenta"}
                                </Link>
                            </Grid>
                        </Grid>
                        
                        <Toast className="mt-3" style={{ backgroundColor: 'red' }} onClose={() => this.toggle("showError")} show={this.state.showError} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">{this.state.errorMessage}</strong>
                            </Toast.Header>
                        </Toast>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>

        )
    }
}

export default Login