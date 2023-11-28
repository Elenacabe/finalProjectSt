const express = require('express')
const router = express.Router()
const User = require("../models/User.model")

router.get('/getAll', (req, res, next) => {
    User
        .find()
        .then(users => res.json(users))
        .catch((err) => next(err))

})

router.get('/getDetailsProfile/:_id', (req, res, next) => {
    const { _id } = req.params
    User
        .findById(_id)
        .then(user => res.json(user))
        .catch(err => next(err))
})

router.get('/edit/:_id', (req, res, next) => {
    const { _id } = req.params

    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            const { username, avatar, role, following, about } = user
            res.json({ username, avatar, role, following, about })
        })
        .catch((err) => next(err))
})



router.put('/edit/:_id', (req, res, next) => {
    const { username, avatar, role, following, about } = req.body
    const { _id } = req.params
    User
        .findByIdAndUpdate({ _id }, {
            username,
            avatar,
            role,
            following,
            about

        })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => next(err))

})


router.delete('/delete/:_id', (req, res, nex) => {
    const { _id } = req.params
    User
        .findByIdAndDelete({ _id })
        .then(() => res.sendStatus(200).json)
        .catch(err => next(err))
})

module.exports = router