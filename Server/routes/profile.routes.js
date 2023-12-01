const express = require('express')
const router = express.Router()
const { getAllUsers, getDetailsProfile, editProfile, editProfileHandler, deleteProfile } = require('../controllers/profile.controller')

// TODO: DESACOPLAR CONTROLLERS
// TODO: REVISAR OPORTUNIDADES DE SELECCIONAR

router.get('/getAll', getAllUsers)

router.get('/getDetailsProfile/:_id', getDetailsProfile)

router.get('/edit/:_id', editProfile)

router.put('/edit/:_id', editProfileHandler)

router.post('/delete/:_id', deleteProfile)



module.exports = router