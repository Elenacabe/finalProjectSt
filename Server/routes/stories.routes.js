const express = require('express')
const router = express.Router()
const Story = require('./../models/Story.model')

router.post('/newStory', (req, res, next) => {
    const { writer, title, story, cover } = req.body

    Story
        .create({ writer, title, story, cover })
        .then(() => res.sendStatus(200))
        .catch((err) => next(err))
})

router.get('/getAllStories', (req, res, next) => {
    Story.find()
        .populate('writer', 'username')
        .populate('comments')
        .sort({ createdAt: -1 })
        .then((stories) => res.json(stories))
        .catch((err) => next(err))
})


router.get('/details/:storyId', (req, res, next) => {
    const { storyId } = req.params
    Story.findById(storyId)
        .populate('writer', 'username')
        .populate({
            path: 'comments'
        })
        .then((story) => {
            if (!story) {
                return res.status(404).json({ error: 'Story not found' })
            }
            res.json(story)
        })
        .catch((err) => next(err))
})



router.put('/edit/:story_id', (req, res, next) => {
    const { story_id } = req.params
    const { title, story, cover } = req.body

    Story.findByIdAndUpdate(story_id, { title, story, cover })
        .then((updatedStory) => {
            if (!updatedStory) {
                return res.status(404).json({ error: 'Story not found' })
            }
            res.json(updatedStory)
        })
        .catch((err) => next(err))
})


router.delete('/deleteStory/:story_id', (req, res, next) => {
    const { story_id } = req.params

    Story.findByIdAndDelete(story_id)
        .then((deletedStory) => {
            if (!deletedStory) {
                return res.status(404).json({ error: 'Story not found' })
            }
            res.json({ message: 'Story deleted successfully' })
        })
        .catch((err) => next(err))
})

module.exports = router
