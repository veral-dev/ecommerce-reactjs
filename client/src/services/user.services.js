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
    postUser = user => this.service.post(`/new`, user).then(response => response.data)
    updateUser = (id, user) => this.service.put(`/update/${id}`, user).then(response => response.data)
    deleteUser = (id) => this.service.delete(`/delete/${id}`).then(response => response.data)
    searchUser = (search) => this.service.post(`/search`, { search }).then(response => response.data)
}