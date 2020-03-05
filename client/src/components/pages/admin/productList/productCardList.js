import React from 'react'

import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'


// deleteVariant = idx => {
//     let modelCopy = [...this.state.product.model]
//     modelCopy.splice(idx, 1)
//     this.setState({
//         product: { ...this.state.product, model: modelCopy }
//     })
// }

const ProductCard = ({  name, images, excerpt, category, tags, model, _id, deleteProduct }) => {
    
    return (
        <tr>
            <td><img className="m-3" src={images[0]} alt={name} style={{ width: "50px" }} /></td>
            <td>{name}</td>
            <td>{category}</td>
            <td><Link as="button" className="mb-20 p-2 btn btn-outline-success" to={`/products/${_id}`}>Modificar</Link></td>
            <td><Button variant="outline-danger" className="mb-20 p-2" onClick={deleteProduct}>Borrar</Button></td>
        </tr>
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

export default ProductCard