// Objetivo: Validar los datos de entrada para los endpoints de comercio
const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

// Validaciones para la ruta get comercio por cif
const validatorGetComercio = [
        
    check("cif").exists().notEmpty().isLength({min:9, max:9}),

    (req,res,next) => {
        return validateResults(req,res,next)
    }

]

// Validaciones para la ruta post para crear comercio
const validatorCreateComercio = [
    
    check("name").exists().notEmpty(),
    check("cif").exists().notEmpty().isLength({min:9, max:9}),
    check("email").exists().notEmpty().isEmail(),
    check("phone").exists().notEmpty().isMobilePhone(),
    check("page_id").exists().notEmpty().isInt(),

    (req,res,next) => {
        return validateResults(req,res,next)
    }

]

// Validaciones para la ruta put para actualizar comercio
const validatorUpdateComercio = [
        
    check("cifId").exists().notEmpty().isLength({min:9, max:9}),
    check("name").optional().notEmpty(),
    check("cif").optional().notEmpty().isLength({min:9, max:9}),
    check("email").optional().notEmpty().isEmail(),
    check("phone").optional().notEmpty().isMobilePhone(),
    check("page_id").optional().notEmpty().isInt(),

    (req,res,next) => {
        return validateResults(req,res,next)
    }

]

// Validaciones para la ruta delete para borrar comercio
const validatorDeleteComercio = [
        
    check("cif").exists().notEmpty().isLength({min:9, max:9}),

    (req,res,next) => {
        return validateResults(req,res,next)
    }

]

// Validaciones para la ruta patch para restaurar comercio
const validatorRestoreCommerce = [
            
    check("cif").exists().notEmpty().isLength({min:9, max:9}),

    (req,res,next) => {
        return validateResults(req,res,next)
    }

]

module.exports = {
    validatorCreateComercio,
    validatorUpdateComercio,
    validatorDeleteComercio,
    validatorGetComercio,
    validatorRestoreCommerce
}