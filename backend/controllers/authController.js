import fieldValidator from "../utils/fieldValidator.js";
import prisma from "../prisma/index.js";
import generateToken from "../utils/generateToken.js";
import { sendError, sendSuccess } from "../helpers/helper.js";
import {
  ERROR,
  NOTFOUND,
  SUCCESS,
  UNACCEPTABLE,
  UNAUTHORIZED,
} from "../helpers/keys.js";
import bcrypt from "bcryptjs";

/**
 * endpoint: /olympics/register
 * method: post
 * secured: false
 *
 * @returns {String} - success message
 */
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const check = fieldValidator({ username, password });
    if (check.error) {
      return sendError(res, UNACCEPTABLE, check.message);
    }

    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hash = bcrypt.hashSync(password, salt);

    await prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });

    return sendSuccess(res, SUCCESS, "OK:  User Created.");
  } catch (error) {
    return sendError(res, ERROR, "Internal Server Error");
  }
};

/**
 * endpoint: /olympics/login
 * method: post
 * secured: false
 *
 * @returns {Object} - details of authenticated user
 */
export const login = async (req, res) => {  
  try {
    const { username, password } = req.body;    

    const check = fieldValidator({ username, password });
    if (check.error) {
      return sendError(res, UNACCEPTABLE, check.message);
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return sendError(res, NOTFOUND, "No such user found!");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return sendError(
        res,
        UNAUTHORIZED,
        "Unauthorized: Authentication failed."
      );
    }

    const token = generateToken(user);

    await prisma.user.update({
      where: {
        username,
      },
      data: {
        token,
      },
    });

    const data = {
      ...user,
      password: undefined,
      token,
    };

    return sendSuccess(res, SUCCESS, "OK: Successful authentication.", data);
  } catch (error) {
    return sendError(res, ERROR, "Internal Server Error");
  }
};

/**
 * endpoint: /olympics/logout
 * method: put
 * secured: true
 *
 * @returns {String} - success message
 */
export const logout = async (req, res) => {
  try {
    const { username } = req.body;

    const check = fieldValidator({ username });
    if (check.error) {
      return sendError(res, UNACCEPTABLE, check.message);
    }

    await prisma.user.update({
      where: {
        username,
      },
      data: {
        token: null,
      },
    });

    return sendSuccess(res, SUCCESS, "OK: Successful logout.");
  } catch (error) {
    return sendError(res, ERROR, "Internal Server Error");
  }
};
