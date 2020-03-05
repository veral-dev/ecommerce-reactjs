import React, { Component } from 'react'
import '../admin.css';
import './productForm.css';

import ProductsServices from '../../../../services/product.services'
import FilesServices from '../../../../services/files.services'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'



class ProductForm extends Component {

    constructor(props) {
        super(props)
        this.ProductServices = new ProductsServices()
        this.filesServices = new FilesServices()
        this.state = {
            product: {
                name: '',
                excerpt: '',
                category: '',
                tags: '',
                images: [],
                model: [],


            },
            variant: {
                size: '',
                stock: 0,
                price: 0
            },

        }
    }

    finishAction = () => {
        this.setState({
            product: {
                name: '',
                excerpt: '',
                category: '',
                tags: '',
                images: [],
                model: [],
            },
        })
        // this.props.refreshList()
    }

    postProduct = () => {
        this.ProductServices.postProduct(this.state.product)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            product: { ...this.state.product, [name]: value }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postProduct()
    }

    handleChangeVariant = e => {
        let { name, value } = e.target
        this.setState({
            variant: { ...this.state.variant, [name]: value }
        })
    }
    handleSubmitVariant = e => {
        e.preventDefault()
        let modelCopy = [...this.state.product.model]
        modelCopy.push(this.state.variant)
        this.setState({
            product: { ...this.state.product, model: modelCopy },
            variant: {
                size: '',
                stock: 0,
                price: 0
            },
            showmodal: false,
        })

    }

    deleteVariant = idx => {
        let modelCopy = [...this.state.product.model]
        modelCopy.splice(idx, 1)
        this.setState({
            product: { ...this.state.product, model: modelCopy }
        })
    }

    handleFileUpload = e => {
        const uploadData = new FormData()
        for (let key in e.target.files) {
            uploadData.append("images", e.target.files[key])
        }
        this.filesServices.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    product: { ...this.state.product, images: response.secure_url }
                })
            })
            .catch(err => console.log(err))
    }

    toggleModal = () => this.setState({ showmodal: !this.state.showmodal })

    render() {
        return (
            <div className="py-5 create-product">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="name" value={this.state.product.name} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción corta</Form.Label>
                        <Form.Control type="text" name="excerpt" value={this.state.product.excerpt} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control type="text" name="category" value={this.state.product.category} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Etiquetas de búsqueda</Form.Label>
                        <Form.Control type="text" name="tags" value={this.state.product.tags} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Imágenes</Form.Label>
                        <Form.Control type="file" name="images" onChange={this.handleFileUpload} multiple />
                        {this.state.product.images !== 0 ? this.state.product.images.map((elm, idx) => <img className="m-3" src={elm} key={idx} alt={idx} style={{ width: "50px" }} />) : 'No hay imágenes cargadas'}
                    </Form.Group>


                </Form>


                <Modal show={this.state.showmodal} onHide={this.toggleModal}>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmitVariant}>
                            <Form.Group>
                                <Form.Label>Medida</Form.Label>
                                <Form.Control type="text" name="size" value={this.state.variant.size} onChange={this.handleChangeVariant} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={this.state.variant.price} onChange={this.handleChangeVariant} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" name="stock" value={this.state.variant.stock} onChange={this.handleChangeVariant} />
                            </Form.Group>
                            <Button variant="dark" type="submit" onSubmit={this.handleSubmitVariant}>Añadir nueva variante al producto</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <h3>Variaciones</h3>
                <Button className="mb-20" variant="outline-light" onClick={this.toggleModal}>Crear nueva variación</Button>

                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Size</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.product.model.map((elm, idx) =>
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{elm.size}</td>
                                <td>{elm.stock}</td>
                                <td>{elm.price}€</td>
                                <td><Button className="mb-20" variant="outline-danger" onClick={() => this.deleteVariant(idx)}>Borrar</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <hr></hr>
                <Button variant="outline-success" type="submit" size="lg" block onClick={this.handleSubmit}>Crear nuevo producto</Button>
            </div>
        )
    }
}

export default ProductForm