const Story = require('../models/Story.model')
const Comment = require('../models/Comment.model')

const newStory = (req, res, next) => {
    const { writer, title, story, cover } = req.body

    Story
        .create({ writer, title, story, cover })
        .then(() => res.sendStatus(200))
        .catch((err) => next(err))
}

const getAllStories = (req, res, next) => {
    Story
        .find()
        .sort({ createdAt: -1 })

        .then((stories) => res.json(stories))
        .catch((err) => next(err))
}

const getStoryDetails = (req, res, next) => {
    const { storyId } = req.params
    Story
        .findById(storyId)
        .populate('writer')
        .populate('comments')
        .then((story) => {
            if (!story) {
                return res.status(404).json({ error: 'Historia no encontrada' })
            }
            res.json(story)
        })
        .catch((err) => next(err))
}

const deleteStory = (req, res, next) => {
    const { story_id } = req.params

    Story
        .deleteOne({ _id: story_id })
        .then((deletedStory) => {
            if (!deletedStory) {
                return res.status(404).json({ error: 'Historia no encontrada' })
            } else {
                Comment
                    .deleteMany({ storyId: story_id })
                    .then(res.json({ message: 'Historia borrada y ssu comment' }))
            }
        })
        .catch((err) => next(err))
}
const valorateStory = (req, res, next) => {
    const { story_id } = req.params
    const { vote, user_id } = req.body
    const valor = {
        userId: user_id,
        vote: vote
    }
    Story
        .findByIdAndUpdate(story_id)
        .then(foundStory => {
            foundStory.valoration.push(valor)
            return foundStory.save()
                .then((historia) => {
                    const sum = historia.valoration.reduce((acc, currentValue) => acc + currentValue.vote, 0)
                    res.json(sum)
                })
        })
        .catch((err) => next(err))

}

const showValoration = (req, res, next) => {
    const { story_id } = req.params
    Story
        .findById(story_id)
        .then(foundStory => {
            const sum = foundStory.valoration.reduce((acc, currentValue) => acc + currentValue.vote, 0)
            const avg = sum / foundStory.valoration.length
            res.json(avg.toFixed(2))
        })
        .catch((err) => next(err))

}

module.exports =
{
    newStory,
    getAllStories,
    getStoryDetails,
    deleteStory,
    valorateStory,
    showValoration
}