const express = require('express')
const router = express.Router()
const Comment = require('./../models/Comment.model')
const Story = require('../models/Story.model')



router.post('/newComment', (req, res, next) => {
    const { author, comment, storyId } = req.body
    console.log({ author, comment, storyId })

    Comment
        .create({ author, comment })
        .then((newComment) => {
            Story.findById(storyId)
                .then(foundStory => {
                    foundStory.comments.push(newComment._id);
                    foundStory.save()
                        .then(() => {
                            res.json(newComment)
                        })
                        .catch((err) => next(err))
                })
                .catch((err) => next(err))
        })
        .catch((err) => next(err))
})


router.get('/getAllComments', (req, res, next) => {
    Comment
        .find()
        .populate('author', 'username')
        .sort({ createdAt: -1 })
        .then((comments) => res.json(comments))
        .catch((err) => next(err))
})


router.put('/editComment/:comment_id', (req, res, next) => {
    const { comment_id } = req.params
    const { comment } = req.body

    Comment
        .findByIdAndUpdate(comment_id, { comment }, { new: true })
        .then((updatedComment) => {
            if (!updatedComment) {
                return res.status(404).json({ error: 'Comment not found' })
            }
            res.json(updatedComment)
        })
        .catch((err) => next(err))
})

router.delete('/deleteComment/:comment_id', (req, res, next) => {
    const { comment_id } = req.params

    Comment
        .findByIdAndDelete(comment_id)
        .then((deletedComment) => {
            if (!deletedComment) {
                return res.status(404).json({ error: 'Comment not found' })
            }
            res.json({ message: 'Comment deleted successfully' })
        })
        .catch((err) => next(err))
})

module.exports = router
