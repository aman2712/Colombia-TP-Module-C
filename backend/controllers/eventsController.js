import fieldValidator from "../utils/fieldValidator.js";
import prisma from "../prisma/index.js";
import { sendError, sendSuccess } from "../helpers/helper.js";
import { ERROR, NOTFOUND, SUCCESS, UNACCEPTABLE } from "../helpers/keys.js";

/**
 * endpoint: /olympics/events/create
 * method: post
 * secured: true
 *
 * @returns {Object} - details of created event
 */
export const createEvent = async (req, res) => {
  try {
    const { name, date, venue_id } = req.body;

    const check = fieldValidator({ name, date, venue_id });
    if (check.error) {
      return sendError(res, UNACCEPTABLE, check.message);
    }

    const event = await prisma.event.create({
      data: {
        name,
        date: new Date(date),
        venue_id: Number(venue_id),
      },
    });

    return sendSuccess(
      res,
      SUCCESS,
      "Created: Successful evento registration",
      event
    );
  } catch (error) {
    return sendError(res, ERROR, "Internal Server Error");
  }
};

/**
 * endpoint: /olympics/events/list
 * method: get
 * secured: true
 *
 * @returns {Array} - list of all events
 */
export const getListOfEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        venue: true
      }
    });
    

    if (events.length === 0) {
      return sendError(res, NOTFOUND, "Not Found: Resource not found");
    }

    return sendSuccess(res, SUCCESS, "OK: Successful query", events);
  } catch (error) {
    return sendError(res, ERROR, "Internal Server Error");
  }
};

/**
 * endpoint: /olympics/events/edit
 * method: put
 * secured: true
 *
 * @returns {String} - success message
 */
export const editEvent = async (req, res) => {  
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!event) {
      return sendError(res, NOTFOUND, "Not Found: Event not found");
    }

    const { name, date, venue_id } = req.body;

    const check = fieldValidator({ name, date, venue_id });
    if (check.error) {
      return sendError(res, UNACCEPTABLE, check.message);
    }

    await prisma.event.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        date: new Date(date),
        venue_id: Number(venue_id),
      },
    });

    return sendSuccess(res, SUCCESS, "OK: Successful edit");
  } catch (error) {
    return sendError(res, ERROR, "Internal Server Error");
  }
};
