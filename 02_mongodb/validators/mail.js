const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

// Validadores para el envío de correos
const validatorMail = [

    check("subject").exists().notEmpty(),

    check("text").exists().notEmpty(),

    check("to").exists().notEmpty(),

    (req, res, next) => {

        return validateResults(req, res, next)

    }

]

module.exports = { validatorMail }