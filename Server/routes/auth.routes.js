const router = require("express").Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../models/User.model")


const { verifyToken } = require("../middlewares/verifyToken")
const saltRounds = 10


router.post('/signup', (req, res, next) => {

    const { email, password, username, birthDate, about } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return
    }


    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username, birthDate, about })
        })
        .then(() => res.sendStatus(201))
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



router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username } = foundUser;
                const payload = { _id, email, username }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.json({ authToken })

            }
            else {
                res.status(401).json({ message: "Incorrect password" });
            }

        })
        .catch(err => next(err));
})



router.get('/verify', verifyToken, (req, res, next) => {

    const loggedUser = req.payload

    res.json({ loggedUser })
})



module.exports = router