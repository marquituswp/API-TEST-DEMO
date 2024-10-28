const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

// Validamos los datos de registro de usuario
const validateRegisterUser = [
    check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("age").exists().notEmpty().isNumeric(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
    check("city").exists().notEmpty(),
    // Validamos que los intereses sean un array y los pasamos a minúsculas
    check("interests").exists().notEmpty().isArray().customSanitizer((value)=>{
        return value.map(interests => interests.toLowerCase())
    }),
    check("allowOffers").exists().notEmpty(),
    (req,res,next) =>{
        validateResults(req,res,next)
    }
]

// Validamos los datos de login de usuario
const validateLoginUser = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
    (req,res,next) =>{
        validateResults(req,res,next)
    }
]

module.exports = {validateLoginUser,validateRegisterUser}