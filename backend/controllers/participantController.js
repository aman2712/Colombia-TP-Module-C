import fieldValidator from "../utils/fieldValidator.js";
import prisma from "../prisma/index.js";
import { sendError, sendSuccess } from "../helpers/helper.js";
import {
    CREATED,
  DELETED,
  ERROR,
  NOTFOUND,
  SUCCESS,
  UNACCEPTABLE,
} from "../helpers/keys.js";

/**
 * endpoint: /olympics/participants/create
 * method: post
 * secured: true
 *
 * @returns {Object} - details of created participant
*/
export const createParticipant = async (req, res) => {
    try {
        const { fullname, email, phone, event_id } = req.body

        const check = fieldValidator({fullname, email, phone, event_id })
        if (check.error) {
            return sendError(res, UNACCEPTABLE, check.message);
        }

        const participant = await prisma.participant.create({
            data: {
                fullname, email, phone, event_id: Number(event_id)
            }
        })

        return sendSuccess(res, CREATED, 'Created: Successful participant registration', participant)
    } catch (error) {
        return sendError(res, ERROR, "Internal Server Error");
    }
}

/**
 * endpoint: /olympics/participants/list/:idevent
 * method: get
 * secured: true
 *
 * @returns {Array} - list of participants
*/
export const getParticipantsByEvent = async (req, res) => {    
    try {
        const { idevent } = req.params        

        const participants =  await prisma.participant.findMany({
            where: {
                event_id: Number(idevent)
            },
            include: {
                event: true
            }
        })        

        if(participants.length === 0){
            return sendError(res, NOTFOUND, 'Not Found: Resource not found')
        }

        return sendSuccess(res, SUCCESS, 'All participants', participants)
    } catch (error) {
        return sendError(res, ERROR, "Internal Server Error");
    }
}

/**
 * endpoint: /olympics/participants/delete/:id
 * method: delete
 * secured: true
 *
 * @returns {String} - success message
*/
export const deleteParticipant = async (req, res) => {
    try {
        const { id } = req.params        

        const user = await prisma.participant.findUnique({
            where: {
                id: Number(id)
            }
        })        

        if(!user){
            return sendError(res, NOTFOUND, 'Not Found: Participant not found.')
        }

        await prisma.participant.delete({
            where: {
                id: Number(id)
            }
        })

        return sendSuccess(res, SUCCESS, '204 No Content: Successful deletion')
    } catch (error) {
        return sendError(res, ERROR, "Internal Server Error");
    }
}