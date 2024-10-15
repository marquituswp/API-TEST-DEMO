const {check} = require("express-validator")
const valdateResults = require("../utils/handleValidator")

const validatorGetComercio = [
        
    check("cif").exists().notEmpty().isLength({min:9, max:9}),

    (req,res,next) => {
        return valdateResults(req,res,next)
    }

]

const validatorCreateComercio = [
    
    check("name").exists().notEmpty(),
    check("cif").exists().notEmpty().isLength({min:9, max:9}),
    check("email").exists().notEmpty().isEmail(),
    check("phone").exists().notEmpty().isMobilePhone(),
    check("page_id").exists().notEmpty().isInt(),

    (req,res,next) => {
        return valdateResults(req,res,next)
    }

]

const validatorUpdateComercio = [
        
    check("cifId").exists().notEmpty().isLength({min:9, max:9}),
    check("name").optional().notEmpty(),
    check("cif").optional().notEmpty().isLength({min:9, max:9}),
    check("email").optional().notEmpty().isEmail(),
    check("phone").optional().notEmpty().isMobilePhone(),
    check("page_id").optional().notEmpty().isInt(),

    (req,res,next) => {
        return valdateResults(req,res,next)
    }

]

const validatorDeleteComercio = [
        
    check("cif").exists().notEmpty().isLength({min:9, max:9}),

    (req,res,next) => {
        return valdateResults(req,res,next)
    }

]

module.exports = {
    validatorCreateComercio,
    validatorUpdateComercio,
    validatorDeleteComercio,
    validatorGetComercio
}