const express = require('express')
const router = express.Router()
const { newStory, getAllStories, getStoryDetails, deleteStory, valorateStory, showValoration } = require('../controllers/stories.controller')

router.post('/newStory', newStory)

router.get('/getAllStories', getAllStories)

router.get('/details/:storyId', getStoryDetails)

//NO SE PUEDE EDITAR TU STORY, SI NO TE GUSTA, DELETE Y CREAS UNA
// router.put('/edit/:story_id', (req, res, next) => {
//     const { story_id } = req.params
//     const { title, story, cover } = req.body

//     Story
//         .findByIdAndUpdate(story_id, { title, story, cover }, { new: true })
//         .then((updatedStory) => {
//             if (!updatedStory) {
//                 return res.status(404).json({ error: 'Story not found' })
//             }
//             res.json(updatedStory)
//         })
//         .catch((err) => next(err))
// })

router.put('/valorate/:story_id', valorateStory)

router.get('/showValoration/:story_id', showValoration)

router.post('/deleteStory/:story_id', deleteStory)

module.exports = router
