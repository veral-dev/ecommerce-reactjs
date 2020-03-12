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
// import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
        this.toggle("showDrawer")
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
                {/* <CssBaseline /> */}
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
                                {this.props.loggedInUser.role === 'admin' ? <Nav.Link as="div"><Link to="/admin/products-list">Lista de productos</Link></Nav.Link> : null}
                                {this.props.loggedInUser.role === 'admin' ? <Nav.Link as="div"><Link to="/admin/users/create-user">Crear usuario</Link></Nav.Link> : null}
                                {this.props.loggedInUser ? <Nav.Link as="div"><Link to="/cuenta/editar">Editar mi cuenta</Link></Nav.Link> : null}
                                {this.props.loggedInUser ? <Nav.Link onClick={this.logout}>Cerrar sesión</Nav.Link> : null}
                            </Nav>
                        </Hidden>

                        <div className="fitcontent-width">
                            <IconButton aria-controls="fade-menu" aria-haspopup="false" >
                                {this.props.loggedInUser ? <Link style={{ fontSize: '1rem' }} to="/profile"><PersonOutlineOutlinedIcon style={{ color: 'black' }} /></Link> : <Link style={{ fontSize: '1rem' }} to="/login"><PersonOutlineOutlinedIcon style={{ color: 'black' }} /></Link>}
                            </IconButton>
                            <IconButton aria-controls="fade-menu" aria-haspopup="false" onClick={this.handleMenu} >
                                <Badge color="secondary" badgeContent={this.state.cartIcon}>
                                    <ShoppingCartOutlinedIcon style={{ color: 'black' }} />
                                </Badge>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                <nav >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                                {this.props.loggedInUser.role === 'admin' ? <Nav.Link as="div"><Link to="/admin/products-list" onClick={() => this.toggle("showDrawer")}>Lista de productos</Link></Nav.Link> : null}
                                {this.props.loggedInUser.role === 'admin' ? <Nav.Link as="div"><Link to="/admin/users/create-user" onClick={() => this.toggle("showDrawer")}>Crear usuario</Link></Nav.Link> : null}
                                {this.props.loggedInUser ? <Nav.Link as="div"><Link to="/cuenta/editar" onClick={() => this.toggle("showDrawer")}>Editar mi cuenta</Link></Nav.Link> : null}
                                {this.props.loggedInUser ? <Nav.Link onClick={this.logout}>Cerrar sesión</Nav.Link> : null}
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