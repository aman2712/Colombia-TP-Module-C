import express from 'express'
const router = express.Router()
import { login, logout, register } from '../controllers/authController.js'
import { checkToken } from '../middlewares/authMiddleware.js'

router.route('/olympics/login').post(login)
router.route('/olympics/register').post(register)
router.route('/olympics/logout').put(checkToken, logout)

export default router