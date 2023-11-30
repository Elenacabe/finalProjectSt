const Story = require('../models/Story.model')

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
        .populate('writer', 'username')
        .populate('comments')
        .then((story) => {
            if (!story) {
                return res.status(404).json({ error: 'Story not found' })
            }
            res.json(story)
        })
        .catch((err) => next(err))
}

const deleteStory = (req, res, next) => {
    const { story_id } = req.params

    Story
        .findByIdAndDelete(story_id)
        .then((deletedStory) => {
            if (!deletedStory) {
                return res.status(404).json({ error: 'Story not found' })
            }
            res.json({ message: 'Story deleted successfully' })
        })
        .catch((err) => next(err))
}

module.exports =
{
    newStory,
    getAllStories,
    getStoryDetails,
    deleteStory
}