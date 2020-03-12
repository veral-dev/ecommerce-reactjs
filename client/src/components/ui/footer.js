import React from 'react'

import './footer.css'
/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
/* ----ICONS----*/

const Footer = () => {

    return (
        <footer className="footer-color">
            <Row>
                <Col sm={12} md={4}>
                    <ul>
                        <li><Link to="#">Blog</Link></li>
                        <li><Link to="#">Sobre nosotros</Link></li>
                        <li><Link to="#">Contacto</Link></li>
                        <li><Link to="#">Preguntas frecuentes</Link></li>
                    </ul>
                </Col>
                <Col sm={12} md={4}>
                    <ul>
                        <li><Link to="#">Blog</Link></li>
                        <li><Link to="#">Sobre nosotros</Link></li>
                        <li><Link to="#">Contacto</Link></li>
                        <li><Link to="#">Preguntas frecuentes</Link></li>
                    </ul>
                </Col>
                <Col sm={12} md={4}>
                    <ul>
                        <li><Link to="#">Blog</Link></li>
                        <li><Link to="#">Sobre nosotros</Link></li>
                        <li><Link to="#">Contacto</Link></li>
                        <li><Link to="#">Preguntas frecuentes</Link></li>
                    </ul>
                </Col>

            </Row>
            <p className="copyright">© 2020 by David Veral</p>
        </footer>
    );
}

export default Footer