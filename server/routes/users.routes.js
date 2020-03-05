const express = require('express')
const router = express.Router()

const User = require('../models/User.model')

router.get('/getAllUsers', (req, res, next) => {
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => console.log(err))
})

router.get('/getOneUser/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    User.create(req.body)
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))
})

router.post('/search', (req, res, next) => {
    const userSearch = req.body.search
    User.find({
        "name": {
            $regex: `.*${userSearch}.*`,
            $options: 'i'
        }
    })
        .then(response => { res.json(response) })
        .catch(err => next(err))

})

router.put('/update/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))

})

router.delete('/delete/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Usuario borrado' }))
        .catch(err => console.log(err))
})

module.exports = router