import React from 'react';
import './ui.css'

import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'


import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';


// import VisibleItemList from '../containers/VisibleItemList'
const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: 'black',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
}));
function ResponsiveDrawer() {
    const dummyCategories = ['Hokusai', 'Hiroshige', 'Utamaro', 'Kuniyoshi', 'Yoshitoshi']
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }


    
    const drawer = (
        <div>
            <List>
                {dummyCategories.map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <div className={classes.root}>
            {/* <CssBaseline /> */}
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className="d-flex justify-content-between">
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className="fitcontent-width" variant="h6" noWrap>
                        Responsive drawer
                    </Typography>
                    <Hidden smDown implementation="css">
                        <Nav className="ml-auto">
                            <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                            <Nav.Link as="div"> <Link to="/profile">Perfil</Link></Nav.Link>
                            <Nav.Link as="div"> <Link to="/admin/products/create">Crear producto</Link></Nav.Link>
                            <Nav.Link as="div"> <Link to="/admin/products/products-list">Lista de productos</Link></Nav.Link>
                            <Nav.Link as="div"> <Link to="/admin/users/users-list">Lista de usuarios</Link></Nav.Link>
                            <Nav.Link as="div"> <Link to="/admin/users/create-user">Crear usuario</Link></Nav.Link>
                            <Nav.Link as="div"> <Link to="/cuenta/editar">Editar mi cuenta</Link></Nav.Link>
                        </Nav>
                    </Hidden>
                    <div className="fitcontent-width">
                        {/* <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            align="right" >
                            <PersonOutlineOutlinedIcon />
                        </IconButton> */}
                        <IconButton aria-controls="fade-menu" aria-haspopup="false" >
                            <PersonOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton aria-controls="fade-menu" aria-haspopup="false" >
                            <Badge color="secondary" badgeContent={4}>
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                            <CloseIcon />
                        </IconButton>
                        {drawer}
                    </Drawer>
                </Hidden>
                {/* Desktop */}

            </nav>

        </div>
    );
}

export default ResponsiveDrawer;