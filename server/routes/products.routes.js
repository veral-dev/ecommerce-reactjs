const express = require('express')
const router = express.Router()

const Product = require('../models/Product.model')

router.get('/getAllProducts', (req, res, next) => {
    Product.find()
        .then(allProducts => res.json(allProducts))
        .catch(err => console.log(err))
})

router.get('/getOneProduct/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(theProduct => res.json(theProduct))
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    // const product = req.body
    // product.minPrice = req.body.models[0].price
    // Como añadirlo a req.body
    Product.create(req.body)
        .then(theProduct => res.json(theProduct))
        .catch(err => console.log(err))
})

router.put('/update/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(theProduct => res.json(theProduct))
        .catch(err => console.log(err))

})

router.post('/search', (req, res, next) => {
    const productSearch = req.body.search
    Product.find({
        "name": {
            $regex: `.*${productSearch}.*`,
            $options: 'i'
        }
    })
        .then(response => { res.json(response) })
        .catch(err => next(err))

})

router.delete('/delete/:id', (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Producto borrado' }))
        .catch(err => console.log(err))
})

module.exports = router