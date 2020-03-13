import React, { Component } from 'react'

/* ----STYLING----*/
import '../shop.css'

/* ----SERVICES----*/
import UserServices from '../../../../services/user.services'

/* ----ROUTES----*/
// import { Link } from 'react-router-dom'


/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';



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
            <Container className="client-body my-5 px-5">

                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            value={this.state.user.name}
                            label="Nombre"
                            fullWidth
                            autoComplete="fname"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            value={this.state.user.lastName}
                            label="Apellidos"
                            fullWidth
                            autoComplete="fname"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            value={this.state.user.email}
                            label="Correo electrónico"
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            value={this.state.user.address1}
                            label="Dirección 1"
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address2"
                            name="address2"
                            value={this.state.user.address2}
                            label="Dirección 2"
                            fullWidth
                            autoComplete="billing address-line2"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            value={this.state.user.city}
                            label="Ciudad"
                            fullWidth
                            autoComplete="billing address-level2"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField id="state" name="state" value={this.state.user.state} label="Provincia/Región" fullWidth onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="zipCode"
                            name="zipCode"
                            value={this.state.user.zipCode}
                            label="Código postal"
                            fullWidth
                            autoComplete="billing postal-code"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            value={this.state.user.country}
                            label="País"
                            fullWidth
                            autoComplete="billing country"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            value={this.state.user.phone}
                            label="Teléfono"
                            fullWidth
                            type="tel"
                            autoComplete="billing country"
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                            label="Usa esta dirección para la factura"
                        /> */}
                    </Grid>
                    <Button onClick={this.handleSubmit} variant="outlined" className="ml-2 mt-4" size="small" startIcon={<SaveIcon />}>
                        Guardar dirección
                    </Button>
                    {/* <Button className="mx-auto mt-2" variant="outline-dark">Guardar dirección</Button> */}
                </Grid>

                {/* <UserFormCheckout />
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField className="mx-4" id="standard-basic" value={this.state.user.name} label="Nombre" type="text" name="name" onChange={this.handleChange} />
                    <TextField className="mx-4" id="standard-basic" value={this.state.user.lastName} label="Apellidos" type="text" name="lastName" onChange={this.handleChange} />
                    <TextField className="mx-4" id="standard-basic" value={this.state.user.role} label="Rol" type="text" name="role" onChange={this.handleChange} />
                    <TextField className="mx-4" id="standard-basic" value={this.state.user.city} label="Ciudad" type="text" name="city" onChange={this.handleChange} />

                </form> */}

                {/* <Button variant="outline-success" type="submit" size="lg" block onClick={this.handleSubmit}>Modificar usuario</Button> */}


            </Container>


        )
    }
}

export default UserUpdate