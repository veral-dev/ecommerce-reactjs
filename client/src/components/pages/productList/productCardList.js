import React from 'react'
import './productCardList.css';



import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function ProductCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button>
            </CardActions>
        </Card>
    );
}

// const ProductCard = ({ name, images, excerpt, category, _id }) => {
//     return (
//         <Col md={4}>
//             <Card className="">
//                 <Card.Body>
//                     <Card.Title><p><strong>{name}</strong></p></Card.Title>
//                     <Card.Img variant="top" src={images[0]} style={{ width: "50px" }} />
//                     <hr></hr>
//                     <Button as="div" variant="dark" size="sm">
//                         <Link to={`/detalles/${_id}`}>Detalles</Link>
//                     </Button>
//                 </Card.Body>
//             </Card>
//         </Col>
//     )
// }

// export default ProductCard