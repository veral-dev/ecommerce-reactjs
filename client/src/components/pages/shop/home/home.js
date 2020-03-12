import React, { Component } from 'react'

/* ----STYLE----*/
import './home.css'

/* ----ROUTES----*/
import AsideHome from '../aside/asideHome'
import AsideUpsells from '../aside/asideUpsells'

/* ----STYLE COMPONENTS----*/
import Container from 'react-bootstrap/Container'


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
        }
    }

    render() {

        return (
            <>
                <div className="home-images">
                    <h2 className="home-title">Tienda de ropa de cama y hogar</h2>
                    <p>Descubre una tienda diferente, 100% responsive en React JS.</p>

                    <img src="https://res.cloudinary.com/dpm7okbrv/image/upload/v1583926005/relakso-react-app/1190005999_2_7_2.jpg.jpg" alt="home1" />
                    <img className="responsive-none" src="https://res.cloudinary.com/dpm7okbrv/image/upload/v1583925734/relakso-react-app/0997005500_2_2_2.jpg.jpg" alt="home2" />


                </div>
                <AsideHome />
                <Container className="home-body">
                    <h1>Bienvenido a Relakso</h1>
                    <p>Al adquirir un producto de RelaksoHome, no solo recibirás un producto duradero, cómodo y de alta calidad, sino que ayudarás a construir un estilo de vida basado en el respeto del planeta y de las personas. Además, plantaremos un árbol a tu nombre por cada pedido realizado para que así, puedas devolver a la naturaleza las bondades que nos ofrece.</p>
                    <p>¡Únete a la Moda de Impacto Positivo!</p>
                    <AsideUpsells numberOfProducts="8" />

                </Container>
            </>
        )
    }
}

export default Home