import express from 'express'
const router = express.Router()
import { createParticipant, deleteParticipant, getParticipantsByEvent } from '../controllers/participantController.js'
import { checkToken } from '../middlewares/authMiddleware.js'

router.route('/create').post(checkToken, createParticipant)
router.route('/list/:idevent').get(checkToken, getParticipantsByEvent)
router.route('/delete/:id').delete(checkToken, deleteParticipant)

export default router