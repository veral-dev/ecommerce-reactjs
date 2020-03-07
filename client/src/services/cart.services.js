import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/carts`,
            withCredentials: true
        })
    }

    getAllCarts = () => this.service.get('/getAllCarts').then(response => response.data)
    getUserCart = cartId => this.service.get(`/getUserCart/${cartId}`).then(response => response.data)
    postCart = cart => this.service.post(`/new`, cart).then(response => response.data)
    updateCart = (id, cart) => this.service.put(`/update/${id}`, cart).then(response => response.data)
    deleteCart = (id) => this.service.delete(`/delete/${id}`).then(response => response.data)
    searchCart = (search) => this.service.post(`/search`, { search }).then(response => response.data)
}