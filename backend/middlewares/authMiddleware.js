import { sendError } from '../helpers/helper.js'
import { UNAUTHORIZED } from '../helpers/keys.js'
import jwt from 'jsonwebtoken'

export const checkToken = (req, res, next) => {
    let token = req.get('authorization')    

    if(token){
        try {
            token = token.split(' ')[1]

            const user = jwt.verify(token, process.env.JWT_SECRET)
            req.user = user;

            next()
        } catch (error) {
            sendError(res, UNAUTHORIZED, 'Authentication Failed! Token was invalid')
        }
    }else{
        sendError(res, UNAUTHORIZED, 'Authentication Failed! Token not found')
    }

}