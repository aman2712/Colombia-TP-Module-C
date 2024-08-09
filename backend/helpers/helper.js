export const sendSuccess = (res, statusCode, message, body, extra) => {
    const response = {
        meta: {
            statusCode,
            ...extra
        },
        message,
        body: body ? body : null
    }

    res.status(statusCode).json(response)
}

export const sendError = (res, statusCode, message) => {
    const response = {
        meta: {
            statusCode,
        },
        message,
    }

    res.status(statusCode).json(response)
}