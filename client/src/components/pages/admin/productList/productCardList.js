import React from 'react'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/
import Button from 'react-bootstrap/Button'

const ProductCard = ({ name, images, excerpt, category, tags, model, _id, deleteProduct }) => {

    return (
        <tr>
            <td><img src={images[0]} alt={name} style={{ width: "50px" }} /></td>
            <td>{name}</td>
            <td>{category}</td>
            <td><Link as="button" className="mb-20 p-2 btn btn-outline-success" to={`/products/${_id}`}>Modificar</Link></td>
            <td><Button variant="outline-danger" className="mb-20 p-2" onClick={deleteProduct}>Borrar</Button></td>
        </tr>
    );
}

export default ProductCard