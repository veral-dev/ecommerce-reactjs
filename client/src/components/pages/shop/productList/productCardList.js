import React from 'react'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE----*/
import './productList.css'
/* ----STYLE COMPONENTS----*/
// import Card from '@material-ui/core/Card';
import Card from 'react-bootstrap/Card'
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Col from 'react-bootstrap/Col'

export default function MediaCard({ name, images, excerpt, category, tags, model, _id, deleteProduct }) {


    return (


        <Col className="col-card-shop" xs={6} md={4} lg={3}>
            <Card className="product-card-shop">
                <div className="position-relative">
                    <Link to={`/productos/${_id}`}><Card.Img variant="top" src={images[0]} /></Link>
                    {/* <p className="btn addCartList">Añadir a la cesta</p> */}
                </div>

                <Card.Body>
                    <Link to={`/productos/${_id}`}><Card.Title>{name}</Card.Title></Link>
                    <Card.Text className="product-list-price">{model[0].price} €</Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        </Col>


        // <Col xs={6} md={3}>
        //     <Card className={classes.root}>
        //         <CardActionArea>
        //             <CardMedia
        //                 className={classes.media}
        //                 image={images[0]}
        //                 title={name} />
        //             <CardContent>
        //                 <Typography gutterBottom variant="h5" component="h2">
        //                     {name}
        //                 </Typography>
        //                 {/* <Typography variant="body2" color="textSecondary" component="p">
        //                 Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        //                 across all continents except Antarctica
        //             </Typography> */}
        //             </CardContent>
        //         </CardActionArea>
        //         <CardActions>
        //             <Button size="small" color="primary">
        //                 Share
        // </Button>
        //             <Button size="small" color="primary">
        //                 Learn More
        // </Button>
        //         </CardActions>
        //     </Card>
        // </Col>

    );
}

// const ProductCard = ({ name, images, excerpt, category, tags, model, _id, deleteProduct }) => {

//     return (


//         <tr className="product-card-shop">
//             <td><img src={images[0]} alt={name} /></td>
//             <td>{name}</td>
//             <td>{category}</td>
//             <td className="d-flex">
//                 <Link as="button" className="p-2 my-2 btn btn-outline-info" to={`/admin/edit-product/${_id}`}><EditIcon fontSize="small" /></Link>
//                 <Button variant="outline-danger" className="ml-2 my-2 p-2" onClick={deleteProduct}><DeleteForeverIcon fontSize="small" /></Button>
//             </td>
//         </tr>
//     );
// }

// export default ProductCard