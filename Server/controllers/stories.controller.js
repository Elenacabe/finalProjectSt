const Story = require('../models/Story.model')
const Comment = require('../models/Comment.model')
const setAverage = require('../utils/setAverage')

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

const getAllMyStories = (req, res, next) => {
    const { userId: writer } = req.params
    Story
        .find({ writer })
        .sort({ createdAt: -1 })
        .then((foundStories) => {
            res.json(foundStories)
        })
        .catch((err) => next(err))
}

const mostInteractedStories = (req, res, next) => {
    Story
        .find()
        .populate('writer comments')//SACAR UTILS
        .then((mostInteracted) => {
            mostInteracted.sort((a, b) => {
                return (b.valoration.length + b.comments.length) - (a.valoration.length + a.comments.length)
            })
            res.json(mostInteracted)
        })
        .catch((err) => next(err))
}
const betterRatedStories = (req, res, next) => {
    Story
        .find()
        .then((betterRated) => {
            betterRated.sort((a, b) => {
                return (setAverage(b) - setAverage(a))
            })
            res.json(betterRated)

        })
        .catch((err) => next(err))
}

const getStoryDetails = (req, res, next) => {
    const { storyId } = req.params
    Story
        .findById(storyId)
        .populate('writer comments')
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
                    .then(() => res.json({ message: 'Historia borrada y sus commentarios' }))
                    .catch((err) => next(err))
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
            if (foundStory.valoration.some(value => value.userId == user_id)) {
                console.log('ya has votado')
            } else {
                foundStory.valoration.push(valor)
                return foundStory.save()
            }
        })
        .then((historia) => {
            res.json(setAverage(historia))
        })
        .catch((err) => next(err))
}




const showValoration = (req, res, next) => {
    const { story_id } = req.params
    Story
        .findById(story_id)
        .then(foundStory => {
            const avg = setAverage(foundStory)
            res.json(avg.toFixed(2))
        })
        .catch((err) => next(err))

}

module.exports =
{
    newStory,
    getAllStories,
    getAllMyStories,
    mostInteractedStories,
    betterRatedStories,
    getStoryDetails,
    deleteStory,
    valorateStory,
    showValoration
}