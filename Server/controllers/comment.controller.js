const Comment = require('../models/Comment.model')
const Story = require('../models/Story.model')

const newComment = (req, res, next) => {

    const { author, comment, storyId } = req.body
    // TODO: REVISAR
    Comment
        .create({ author, comment, storyId })
        .then((newComment) => {
            Story
                .findById(storyId)
                .then(foundStory => {
                    foundStory.comments.unshift(newComment._id);
                    foundStory.save()
                        .then(() => {
                            res.json(newComment)
                        })
                        .catch((err) => next(err))
                })
                .catch((err) => next(err))
        })
        .catch((err) => next(err))
}

const editComment = (req, res, next) => {
    const { comment_id } = req.params
    const { comment } = req.body

    Comment
        .findByIdAndUpdate(comment_id, { comment }, { new: true })
        .then((updatedComment) => {
            if (!updatedComment) {
                return res.status(404).json({ error: 'Comentario no encontrado' })
            }
            res.json(updatedComment)
        })
        .catch((err) => next(err))
}

const deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    const { comment } = req.body

    Comment
        .findByIdAndUpdate(comment_id, { comment }, { new: true })
        .then((updatedComment) => {
            if (!updatedComment) {
                return res.status(404).json({ error: 'Comentario no encontrado' })
            }
            res.json(updatedComment)
        })
        .catch((err) => next(err))
}


module.exports = {
    newComment,
    editComment,
    deleteComment
}