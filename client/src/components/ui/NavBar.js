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
import Button from '@material-ui/core/Button';
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

    // cartQuantityTotal = () => {
    //     let userProductsCopy = this.props.userCart.products
    //     let actualQuantity = 0
    //     userProductsCopy.forEach(elm => actualQuantity += elm.quantity)
    //     this.setState({ cartIconQuantity: actualQuantity })
    // }


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

        const greeting = this.props.loggedInUser ? <>Hola, {this.props.loggedInUser.name}</> : <>Hola, invitad@</>
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                {/* <CssBaseline /> */}
                <AppBar position="fixed" className="navbar-main" style={{ 'color': 'black', 'backgroundColor': 'white' }}>
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
                                <Nav.Link as="div"> <Link to="/profile">Perfil</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/admin/products/create">Crear producto</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/admin/products/products-list">Lista de productos</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/admin/users/users-list">Lista de usuarios</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/admin/users/create-user">Crear usuario</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/cuenta/editar">Editar mi cuenta</Link></Nav.Link>
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



                                <Link as="div" onClick={() => this.toggle("showDrawer")} to="/admin/products/create">Crear producto</Link>
                                <Link as="div" onClick={() => this.toggle("showDrawer")} to="/admin/products/products-list">Lista de productos</Link>
                                <Link as="div" onClick={() => this.toggle("showDrawer")} to="/admin/users/users-list">Lista de usuarios</Link>
                                <Link as="div" onClick={() => this.toggle("showDrawer")} to="/admin/users/create-user">Crear usuario</Link>
                                <Link as="div" onClick={() => this.toggle("showDrawer")} to="/cuenta/editar">Editar mi cuenta</Link>
                                {this.props.loggedInUser ? <Nav.Link onClick={this.logout}>Cerrar sesión</Nav.Link> : null}
                            </Nav>
                        </Drawer>
                    </Hidden>

                </nav>

                <Menu id="fade-menu" keepMounted TransitionComponent={Fade}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{ style: { transform: 'translateY(15%)' } }} >
                    <CartDetails loggedInUser={this.props.loggedInUser} setTheCart={this.props.setTheCart} userCart={this.props.userCart} />
                </Menu>
            </div>

            // this.props.loggedInUser ?
            //     (
            //         <>
            //             <Navbar bg="dark" expand="lg" variant="dark">
            //                 <Navbar.Brand href="#home">Relakso e-Commerce</Navbar.Brand>
            //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
            //                 <Navbar.Collapse id="basic-navbar-nav">
            //                     <Nav className="ml-auto">
            //                         <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
            //                         <Nav.Link as="div"> <Link to="/profile">Perfil</Link></Nav.Link>
            //                         <Nav.Link as="div"> <Link to="/admin/products/create">Crear producto</Link></Nav.Link>
            //                         <Nav.Link as="div"> <Link to="/admin/products/products-list">Lista de productos</Link></Nav.Link>
            //                         <Nav.Link as="div"> <Link to="/admin/users/users-list">Lista de usuarios</Link></Nav.Link>
            //                         <Nav.Link as="div"> <Link to="/admin/users/create-user">Crear usuario</Link></Nav.Link>
            //                         <Nav.Link as="div"> <Link to="/cuenta/editar">Editar mi cuenta</Link></Nav.Link>
            //                         <Nav.Link onClick={this.logout}>Cerrar sesión</Nav.Link>
            //                         <Nav.Link as="div">{greeting}</Nav.Link>

            //                         <Button as="div" aria-controls="fade-menu" aria-haspopup="false" onClick={this.handleMenu}>
            //                             <Badge color="secondary" badgeContent={this.state.cartIcon}>
            //                                 <LocalMallOutlinedIcon />
            //                             </Badge>
            //                         </Button>
            //                     </Nav>
            //                 </Navbar.Collapse>
            //             </Navbar>

            //             <Menu id="fade-menu" keepMounted TransitionComponent={Fade}
            //                 anchorEl={anchorEl}
            //                 open={open}
            //                 onClose={this.handleClose}
            //                 PaperProps={{ style: { transform: 'translateY(15%)' } }} >
            //                 <CartDetails loggedInUser={this.props.loggedInUser} setTheCart={this.props.setTheCart} userCart={this.props.userCart} />
            //             </Menu>
            //         </>
            //     )
            //     :
            //     (
            //         <Navbar bg="dark" expand="lg" variant="dark">
            //             <Navbar.Brand href="#home">Relakso e-Commerce</Navbar.Brand>
            //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
            //             <Navbar.Collapse id="basic-navbar-nav">
            //                 <Nav className="ml-auto">
            //                     <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
            //                     <Nav.Link as="div"> <Link to="/signup">Registro</Link></Nav.Link>
            //                     <Nav.Link as="div"> <Link to="/login">Inicio sesión</Link></Nav.Link>
            //                     <Nav.Link as="div">{greeting}</Nav.Link>
            //                 </Nav>
            //             </Navbar.Collapse>
            //         </Navbar>
            //     )



        )
    }
}

export default Navigation