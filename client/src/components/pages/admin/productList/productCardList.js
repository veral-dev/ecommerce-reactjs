import React from 'react'

/* ----ROUTES----*/
import { Link } from 'react-router-dom'

/* ----STYLE COMPONENTS----*/

import Button from 'react-bootstrap/Button'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const ProductCard = ({ name, images, excerpt, category, tags, model, _id, deleteProduct }) => {

    return (
        <tr>
            <td><img src={images[0]} alt={name} style={{ width: "50px" }} /></td>
            <td>{name}</td>
            <td>{category}</td>
            <td className="d-flex">
                <Link as="button" className="p-2 my-2 btn btn-outline-info" to={`/admin/editar-producto/${_id}`}><EditIcon fontSize="small" /></Link>
                <Button variant="outline-danger" className="ml-2 my-2 p-2" onClick={deleteProduct}><DeleteForeverIcon fontSize="small" /></Button>
            </td>
        </tr>
    );
}

export default ProductCard