const express = require('express')
const router = express.Router()

const { newComment, editComment, deleteComment } = require('../controllers/comment.controller')

router.post('/newComment', newComment)

router.put('/editComment/:comment_id', editComment)

router.delete('/deleteComment/:comment_id', deleteComment)

module.exports = router
