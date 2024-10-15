const { validationResult } = require("express-validator")
const {handleHttpError} = require("../utils/handleError")

const validateResults = (req, res, next) => {

    try {

        validationResult(req).throw()

        return next()

    } catch (err) {

        handleHttpError(res,{ errors: err.array() },403)

    }

}

module.exports = validateResults


