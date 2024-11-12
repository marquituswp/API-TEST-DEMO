// Validaciones para las rutas de la web
const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

// Validaciones para la ruta get web por id
const validatorGetWeb = [

    check("id").exists().notEmpty().isMongoId(),
    
    validateResults

]

// Validaciones para la ruta get web por id
const validatorGetWebs = [

    check("order").optional().notEmpty().isBoolean(),
    
    validateResults

]

// Validaciones para la ruta post para crear web
const validatorCreateWeb = [

    check("city").exists().notEmpty().toLowerCase(),
    check("activity").exists().notEmpty().toLowerCase(),
    check("title").exists().notEmpty(),
    check("summary").exists().notEmpty(),
    check("texts").exists().notEmpty().isArray(),
    check("images").exists().notEmpty().isArray(),
    check("reviews").optional().notEmpty().isObject(),
    check("reviews.scoring").optional().notEmpty().isNumeric().custom(value => value >= 0 && value <= 5),
    check("reviews.points").optional().notEmpty().isNumeric(),
    check("reviews.review").optional().notEmpty(),
    check("cifCommerce").optional().notEmpty(),

    validateResults
    
]

// Validaciones para la ruta put para actualizar web
const validatorUpdateWeb = [
    
        check("id").exists().notEmpty().isMongoId(),
        check("city").optional().notEmpty().toLowerCase(),
        check("activity").optional().notEmpty().toLowerCase(),
        check("title").optional().notEmpty(),
        check("summary").optional().notEmpty(),
        check("texts").optional().notEmpty().isArray(),
        check("images").optional().notEmpty().isArray(),
    
        validateResults
        
]

// Validaciones para la ruta delete para borrar web
const validatorDeleteWeb = [

    check("id").exists().notEmpty().isMongoId(),

    validateResults

]

// Validaciones para la ruta patch para subir imagen
const validatorUploadImage = [

    check("id").exists().notEmpty().isMongoId(),

    validateResults

]

// Validaciones para la ruta patch para restaurar web
const validatorRestoreWeb = [
    
        check("id").exists().notEmpty().isMongoId(),
    
        validateResults
]



module.exports = {
    validatorCreateWeb,
    validatorUpdateWeb,
    validatorDeleteWeb,
    validatorGetWeb,
    validatorUploadImage,
    validatorRestoreWeb,
    validatorGetWebs
}