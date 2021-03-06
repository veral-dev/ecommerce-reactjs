const express = require('express')
const router = express.Router()

const Cart = require('../models/Cart.model')
const Product = require('../models/Product.model')


router.get('/getAllCarts', (req, res, next) => {
    Cart.find()
        .then(allCarts => res.json(allCarts))
        .catch(err => next(err))
})

router.get('/getUserCart/:cartId', (req, res, next) => {
    Cart.findById(req.params.cartId)
        .populate({
            path: 'products.product',
            populate: {
                path: 'product',
                model: 'Product'
            }
        })
        .then(theCart => res.json(theCart))
        .catch(err => next(err))
})

router.post('/new', (req, res, next) => {
    Cart.create(req.body)
        .then(theCart => res.json(theCart))
        .catch(err => next(err))
})

router.post('/search', (req, res, next) => {
    const cartSearch = req.body.search
    Cart.find({
        "name": {
            $regex: `.*${cartSearch}.*`,
            $options: 'i'
        }
    })
        .then(response => { res.json(response) })
        .catch(err => next(err))

})

router.put('/update/:id', (req, res, next) => {
    Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate({
            path: 'products.product',
            populate: {
                path: 'product',
                model: 'Product'
            }
        })
        .then(theCart => res.json(theCart))
        .catch(err => next(err))

})

router.delete('/delete/:id', (req, res, next) => {
    Cart.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Carrito borrado' }))
        .catch(err => next(err))
})



module.exports = router