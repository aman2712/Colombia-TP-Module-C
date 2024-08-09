import express from 'express'
const router = express.Router()
import { createEvent, editEvent, getListOfEvents } from '../controllers/eventsController.js'
import { checkToken } from '../middlewares/authMiddleware.js'

router.route('/create').post(checkToken, createEvent)
router.route('/list').get(checkToken, getListOfEvents)
router.route('/edit/:id').put(checkToken, editEvent)

export default router