import React from 'react'



import { Link } from 'react-router-dom'


// deleteVariant = idx => {
//     let modelCopy = [...this.state.product.model]
//     modelCopy.splice(idx, 1)
//     this.setState({
//         product: { ...this.state.product, model: modelCopy }
//     })
// }

const UserCard = ({ email, name, city, phone, role, _id }) => {
    return (
        <tr>
            <td>{email}</td>
            <td>{name}</td>
            <td>{city}</td>
            <td>{phone}</td>
            <td>{role}</td>
            <td><Link as="button" className="mb-20 p-2 btn btn-outline-success" to="/">Modificar</Link></td>
        </tr>
    );
}

export default UserCard