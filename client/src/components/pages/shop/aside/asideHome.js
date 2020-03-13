import React from 'react'

import './aside.css'
/* ----ROUTES----*/

/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


/* ----ICONS----*/

const AsideHome = () => {

    return (
        <aside className="aside-color home-aside">
            <Container>
                <Row>
                    <Col xs={6} md={3}>
                        <article className="text-center">
                            <img src="/Sustainable-brand1.png" alt="icon1" />
                            <h5>Marca sostenible</h5>
                            <p>Elegimos cuidadosamente nuestros tejidos y reducimos nuestra huella de carbono</p>
                        </article>
                    </Col>
                    <Col xs={6} md={3}>
                        <article className="text-center">
                            <img src="/Ethically-made.gif" alt="icon1" />
                            <h5>Fabricado éticamente</h5>
                            <p>Respetando la seguridad y el bienestar de los trabajadores</p>
                        </article>
                    </Col>
                    <Col xs={6} md={3}>
                        <article className="text-center">
                            <img src="/Tree-for-each-order.png" alt="icon1" />
                            <h5>Plantamos un árbol por pedido</h5>
                            <p>Contribuimos así a la reforestación de nuestro planeta</p>
                        </article>
                    </Col>
                    <Col xs={6} md={3}>
                        <article className="text-center">
                            <img src="/Free-shipping.gif" alt="icon1" />
                            <h5>Envíos gratuitos a partir de 99€*</h5>
                            <p>en envíos a la UE y a partir de 299€ a EEUU, Canadá y Australia*</p>
                        </article>
                    </Col>
                </Row>
            </Container>


        </aside>
    );
}

export default AsideHome