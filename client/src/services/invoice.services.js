import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/invoices`,
            withCredentials: true
        })
    }

    getAllInvoices = () => this.service.get('/getAllInvoices').then(response => response.data)
    getInvoiceDetails = query => this.service.get(`/getOneInvoice${query}`).then(response => response.data)
    postInvoice = invoice => this.service.post(`/new`, invoice).then(response => response.data)
    updateInvoice = (id, invoice) => this.service.put(`/update/${id}`, invoice).then(response => response.data)
    deleteInvoice = (id) => this.service.delete(`/delete/${id}`).then(response => response.data)
    searchInvoice = (search) => this.service.post(`/search`, { search }).then(response => response.data)
}