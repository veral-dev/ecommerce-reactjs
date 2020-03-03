const express = require('express')
const router = express.Router()

const Coaster = require('../models/Product.model')

router.get('/getAllProducts', (req, res, next) => {
    Coaster.find()
        .then(allProducts => res.json(allProducts))
        .catch(err => console.log(err))
})

router.get('/getOneProduct/:id', (req, res, next) => {
    Coaster.findById(req.params.id)
        .then(theProduct => res.json(theProduct))
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    Coaster.create(req.body)
        .then(theProduct => res.json(theProduct))
        .catch(err => console.log(err))
})



module.exports = router