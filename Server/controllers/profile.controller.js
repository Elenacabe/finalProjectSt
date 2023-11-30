const User = require('../models/User.model')

const getAllUsers = (req, res, next) => {
    User
        .find()
        // .select()
        .then(users => res.json(users))
        .catch((err) => next(err))

}

const getDetailsProfile = (req, res, next) => {
    const { _id } = req.params

    User
        .findById(_id)
        .then(user => res.json(user))
        .catch(err => next(err))
}

const editProfile = (req, res, next) => {
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
}

const editProfileHandler = (req, res, next) => {
    const { username, avatar, role, following, about } = req.body
    const { _id } = req.params
    User
        .findByIdAndUpdate({ _id }, {
            username,
            avatar,
            role,
            following,
            about

        }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => next(err))

}

const deleteProfile = (req, res, next) => {
    const { _id } = req.params
    User
        .findByIdAndDelete(_id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

module.exports = {
    getAllUsers,
    getDetailsProfile,
    editProfile,
    editProfileHandler,
    deleteProfile
}