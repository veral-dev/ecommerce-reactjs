import React, { Component } from 'react'

/* ----STYLE----*/
import '../login.css'

/* ----SERVICES----*/
import AuthServices from '../../../../services/auth.services'

/* ----STYLE COMPONENTS----*/
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Toast from 'react-bootstrap/Toast'



class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            showError: false,
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
            .catch(err => this.setState({ errorMessage: err.response.data.message },
                () => { this.toggle("showError") }))
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

    toggle = (component) => this.setState({ [component]: !this.state[component] })

    render() {

        return (


            <Container maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <Avatar className="avatar" style={{ backgroundColor: '#fdd100' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registro
                    </Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={12} sm={6}>
                                <TextField autoComplete="fname" name="name" variant="outlined" required fullWidth id="name" label="Nombre" autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" required fullWidth id="lastName" label="Apellidos" name="lastName" autoComplete="lname" />
                            </Grid> */}
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Contraseña" type="password" id="password"
                                    inputProps={{ title: "Tu contraseña debe incluir más de 6 caracteres", pattern: ".{6,}" }}
                                    autoComplete="current-password" value={this.state.password} onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel required control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="He leído y acepto la política de privacidad"
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className="submit">
                            Registrarse
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    ¿Ya tienes cuenta? Iniciar sesión
                                </Link>
                            </Grid>
                        </Grid>
                        <Toast className="mt-3" onClose={() => this.toggle("showError")} show={this.state.showError} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">{this.state.errorMessage}</strong>
                            </Toast.Header>
                        </Toast>
                    </form>
                </div>
            </Container>


            // <Container>

            //     <h1>Registro de usuarios</h1>

            //     <Form onSubmit={this.handleSubmit}>
            //         <Form.Group>
            //             <Form.Label>Email</Form.Label>
            //             <Form.Control type="email" name="email" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
            //             <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            //         </Form.Group>

            //         <Form.Group controlId="formBasicPassword">
            //             <Form.Label>Contraseña</Form.Label>
            //             <Form.Control type="password" pattern=".{6,}" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleChange} />
            //         </Form.Group>
            //         <Form.Group controlId="formBasicCheckbox">
            //             <Form.Check type="checkbox" label="Check me out" />
            //         </Form.Group>
            //         <Button variant="outline-dark" type="submit">Registrarse</Button>
            //     </Form>
            //     <p>{this.state.errorMessage}</p>
            // </Container>

        )
    }
}

export default Signup