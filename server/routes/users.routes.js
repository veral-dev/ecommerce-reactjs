const express = require('express')
const router = express.Router()

const Coaster = require('../models/User.model')

router.get('/getAllUsers', (req, res, next) => {
    Coaster.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => console.log(err))
})

router.get('/getOneUser/:id', (req, res, next) => {
    Coaster.findById(req.params.id)
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    Coaster.create(req.body)
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))
})



module.exports = router