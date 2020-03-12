import React, { Component } from 'react'

/* ----STYLING----*/
import './checkout.css';

/* ----SERVICES----*/
import UserServices from '../../../../services/user.services'

/* ----STYLE COMPONENTS----*/
// import Container from 'react-bootstrap/Container'
// import Button from 'react-bootstrap/Button'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';



class UserFormCheckout extends Component {

    constructor(props) {
        super(props)
        this.UserServices = new UserServices()
        this.state = {
            user: {
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

        }
    }

    componentDidMount = () => {
      
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loggedInUser._id !== this.props.loggedInUser._id) this.setState({ user: this.props.loggedInUser })
    }


    updateUser = () => {
        console.log('post user1', this.state.user)
        this.UserServices.updateUser(this.state.user._id, this.state.user)
            .then(theUser => console.log('post user2', theUser))
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            user: { ...this.state.user, [name]: value }
        }, () => this.props.setTheUser(this.state.user))
        
    }


    handleSubmit = e => {
        e.preventDefault()
        this.updateUser()
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

            <>
                <Typography variant="h6" gutterBottom>
                    Dirección de envío
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            value={this.state.user.lastName}
                            label="Apellidos"
                            fullWidth
                            autoComplete="lname"
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
                            autoComplete="billing address-line1"
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
                    <Button onClick={this.handleSubmit} variant="outlined" className="mx-auto mt-4" size="small" startIcon={<SaveIcon />}>
                        Guardar dirección
                    </Button>
                    {/* <Button className="mx-auto mt-2" variant="outline-dark">Guardar dirección</Button> */}
                </Grid>

            </>
        )
    }
}

export default UserFormCheckout