import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/users`,
            withCredentials: true
        })
    }

    getAllUsers = () => this.service.get('/getAllUsers').then(response => response.data)
    getUserDetails = id => this.service.get(`/getOneUser/${id}`).then(response => response.data)
    postUser = product => this.service.post(`/new`, product).then(response => response.data)
}