import React from 'react'

/* ----ROUTES----*/
import Link from '@material-ui/core/Link';

/* ----STYLE----*/
import './productList.css'
/* ----STYLE COMPONENTS----*/
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

export default function ProductCard({ name, images, model, _id }) {

    return (


        <Col className="col-card-shop" xs={6} md={4} lg={3}>
            <Card className="product-card-shop">
                <div className="position-relative">
                    <Link href={`/productos/${_id}`}><Card.Img variant="top" src={images[0]} /></Link>
                </div>

                <Card.Body>
                    <Link href={`/productos/${_id}`}><Card.Title>{name}</Card.Title></Link>
                    <Card.Text className="product-list-price">{model[0].price} €</Card.Text>
                </Card.Body>
            </Card>
        </Col>

    );
}