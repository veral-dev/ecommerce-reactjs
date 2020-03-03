
import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/products',
            withCredentials: true
        })
    }

    getAllProducts = () => this.service.get('/getAllProducts').then(response => response.data)
    getProductDetails = id => this.service.get(`/getOneProduct/${id}`).then(response => response.data)
    postProduct = product => this.service.post(`/new`, product).then(response => response.data)
}