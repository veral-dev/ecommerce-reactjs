import React, { Component } from 'react'

/* ----STYLE----*/
import './ui.css'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'
import CartDetails from '../pages/shop/cartDetails/cartDetails'

/* ----SERVICES----*/
import AuthServices from '../../services/auth.services'

/* ----STYLE COMPONENTS----*/
import Nav from 'react-bootstrap/Nav'
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
/* ----ICONS---- */
import MenuIcon from '@material-ui/icons/Menu';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CloseIcon from '@material-ui/icons/Close';


class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cartMenu: false,
            anchorEl: null,
            cartIcon: '0',
            showDrawer: false
        }
        this.authServices = new AuthServices()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userCart.cartIconQuantity !== this.props.userCart.cartIconQuantity) this.setState({ cartIcon: this.props.userCart.cartIconQuantity })
    }

    logout = () => {
        this.authServices.logout()
            .then(response => { this.props.setTheUser(false) })
            .catch(err => console.log(err))
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    openCart = () => this.setState({ cartMenu: !this.state.cartMenu })
    toggle = (component) => this.setState({ [component]: !this.state[component] })

    render() {

        // const greeting = this.props.loggedInUser ? <>Hola, {this.props.loggedInUser.name}</> : <>Hola, invitad@</>
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <AppBar position="fixed" className="navbar-main" style={{ 'color': 'black', 'backgroundColor': 'rgba(255, 255, 255, 0.65)' }}>
                    <Toolbar className="d-flex justify-content-between">
                        <div className="menuButton">
                            <IconButton color="inherit" aria-label="Open drawer" edge="start" onClick={() => this.toggle("showDrawer")} >
                                <MenuIcon />
                            </IconButton>
                        </div>

                        <Typography className="fitcontent-width" variant="h6" noWrap>
                            <Link as="div" to="/"><img src="/Relakso-Logo-BL.png" alt="Relakso ReactJS Ecommerce" /></Link>
                        </Typography>

                        <Hidden smDown implementation="css">
                            <Nav className="ml-auto">
                                <Nav.Link as="div"><Link to="/coleccion">Colección</Link></Nav.Link>
                                {!this.props.loggedInUser ? <Nav.Link as="div"><Link to="/signup">Crear cuenta</Link></Nav.Link> : null}
                                {this.props.loggedInUser ? <Nav.Link onClick={this.logout}>Cerrar sesión</Nav.Link> : null}
                            </Nav>
                        </Hidden>

                        <div className="fitcontent-width">
                            {this.props.loggedInUser ?
                                <>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip style={{ zIndex: '2000' }}>Editar Cuenta</Tooltip>}>
                                        <IconButton aria-controls="fade-menu" aria-haspopup="false">
                                            <Link style={{ fontSize: '1rem' }} to={`/cuenta/editar/${this.props.loggedInUser._id}`}><PersonOutlineOutlinedIcon style={{ color: 'black' }} /></Link>
                                        </IconButton>
                                    </OverlayTrigger>{' '}
                                </> : <>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip style={{ zIndex: '2000' }}>Iniciar sesión/Registrarse</Tooltip>}>
                                        <IconButton aria-controls="fade-menu" aria-haspopup="false">
                                            <Link style={{ fontSize: '1rem' }} to="/login"><PersonOutlineOutlinedIcon style={{ color: 'black' }} /></Link>
                                        </IconButton>
                                    </OverlayTrigger>{' '}
                                </>}
                            <IconButton aria-controls="fade-menu" aria-haspopup="false" onClick={this.handleMenu} >
                                <Badge color="secondary" badgeContent={this.state.cartIcon}>
                                    <ShoppingCartOutlinedIcon style={{ color: 'black' }} />
                                </Badge>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                <nav >
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant="temporary"
                            anchor='left'
                            open={this.state.showDrawer}
                            onClose={() => this.toggle("showDrawer")}
                            ModalProps={{ keepMounted: true, }} >
                            <IconButton onClick={() => this.toggle("showDrawer")} >
                                <CloseIcon />
                            </IconButton>
                            <Nav className="mx-auto responsive-navbar">
                                <img src="/Relakso-Logo-BL.png" alt="Relakso ReactJS Ecommerce" />

                                <Nav.Link as="div"><Link to="/coleccion" onClick={() => this.toggle("showDrawer")}>Colección</Link></Nav.Link>
                                {!this.props.loggedInUser ? <Nav.Link as="div"><Link to="/signup" onClick={() => this.toggle("showDrawer")}>Crear cuenta</Link></Nav.Link> : null}
                                {this.props.loggedInUser ? <Nav.Link onClick={() => { this.logout(); this.toggle("showDrawer") }}>Cerrar sesión</Nav.Link> : null}
                            </Nav>
                        </Drawer>
                    </Hidden>


                </nav>

                <Menu id="fade-menu" keepMounted TransitionComponent={Fade}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{ style: { transform: 'translateY(20%)' } }} >
                    <CartDetails loggedInUser={this.props.loggedInUser} handleClose={this.handleClose} setTheCart={this.props.setTheCart} userCart={this.props.userCart} />
                </Menu>
            </div>

        )
    }
}

export default Navigation