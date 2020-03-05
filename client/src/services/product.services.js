import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/products`,
            withCredentials: true
        })
    }

    getAllProducts = () => this.service.get('/getAllProducts').then(response => response.data)
    getProductDetails = id => this.service.get(`/getOneProduct/${id}`).then(response => response.data)
    postProduct = product => this.service.post(`/new`, product).then(response => response.data)
    updateProduct = (id, product) => this.service.put(`/update/${id}`, product).then(response => response.data)
    deleteProduct = (id) => this.service.delete(`/delete/${id}`).then(response => response.data)
    searchProduct = (search) => this.service.post(`/search`, { search }).then(response => response.data)
}