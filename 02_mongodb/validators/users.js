const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

// Validamos los datos de actualización de usuario
const validateUpdateUser = [
    check("id").exists().notEmpty().isMongoId(),
    check("email").optional().notEmpty().isEmail(),
    check("name").optional().notEmpty().isLength({ min: 3, max: 99 }),
    check("age").optional().notEmpty().isNumeric(),
    check("password").optional().notEmpty().isLength({ min: 8, max: 16 }),
    check("city").optional().notEmpty(),
    // Validamos que los intereses sean un array y los pasamos a minúsculas
    check("interests").exists().notEmpty().isArray().customSanitizer((value)=>{
        return value.map(interests => interests.toLowerCase())
    }),
    check("allowOffers").optional().notEmpty(),
    (req,res,next) =>{
        validateResults(req,res,next)
    }
]

// Validamos los datos de borrado de usuario
const validateDeleteUser = [
    check("id").exists().notEmpty().isMongoId(),
    (req,res,next) =>{
        validateResults(req,res,next)
    }
]

// Validamos los datos de actualización de rol de usuario
const validateUpdateRole = [
    check("email").exists().notEmpty().isEmail(),
    check("role").exists().notEmpty().toLowerCase().isIn(["admin", "user"]),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validamos los datos de la ruta get web
const validateGetWeb = [
    check("city").exists().notEmpty(),
    check("interests").optional().notEmpty(),
    check("order").optional().notEmpty(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validamos los datos de la ruta post para crear review
const validateReviewWeb =[
    check("webId").exists().notEmpty().isMongoId(),
    check("scoring").exists().notEmpty().isNumeric().custom(value => value >= 0 && value <= 5),
    check("points").exists().notEmpty().isNumeric(),
    check("review").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = {validateUpdateUser, validateDeleteUser,validateUpdateRole,validateGetWeb,validateReviewWeb}