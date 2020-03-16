const express = require('express')
const router = express.Router()

const Invoice = require('../models/Invoice.model')
const Product = require('../models/Product.model')


router.get('/getAllCarts', (req, res, next) => {
    Invoice.find()
        .then(allInvoices => res.json(allInvoices))
        .catch(err => next(err))
})

router.get('/getOneInvoice', (req, res, next) => {
    console.log('AQUí', req.query)
    Invoice.findById(req.query.pedido)
        .populate({
            path: 'products.product',
            populate: {
                path: 'product',
                model: 'Product'
            }
        })
        .then(theInvoice => res.json(theInvoice))
        .catch(err => next(err))
})

router.post('/new', (req, res, next) => {
    Invoice.create(req.body)
        .then(theInvoice => res.json(theInvoice))
        .catch(err => next(err))
})

router.post('/search', (req, res, next) => {
    const invoiceSearch = req.body.search
    Invoice.find({
        "lastName": {
            $regex: `.*${invoiceSearch}.*`,
            $options: 'i'
        }
    })
        .then(response => { res.json(response) })
        .catch(err => next(err))

})

router.put('/update/:id', (req, res, next) => {
    Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate({
            path: 'products.product',
            populate: {
                path: 'product',
                model: 'Product'
            }
        })
        .then(theInvoice => res.json(theInvoice))
        .catch(err => next(err))

})

router.delete('/delete/:id', (req, res, next) => {
    Invoice.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Carrito borrado' }))
        .catch(err => next(err))
})



module.exports = router