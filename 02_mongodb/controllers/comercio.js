// Controladores de comercio
const {commerceModel} = require('../models');
const {matchedData} = require("express-validator")
const {handleHttpError} = require("../utils/handleError")
const {tokenSignCommerce} = require("../utils/handleJwt")

// Función para obtener todos los comercios
const getComercios = async (req, res) => {
    try {
        const order = req.query.order
        // Recibo el order de la query y lo uso en el sort, si order es true, ordeno por cif, si no, no ordeno
        const data = await commerceModel.find({}).  
        sort(order ? {cif: 1} : {});

        if (!data){
            handleHttpError(res,"NO_DATA",403)
        }

        res.status(200).json(data);
    }
    catch (error) {
        handleHttpError(res,"ERROR_GET_COMERCIO",403)
    }
}

// Función para obtener un comercio por su cif
const getComercioByCif = async (req, res) => {
    try {
        const {cif} = matchedData(req)
        // Busco el comercio por el cif
        const data = await commerceModel.findOne({cif}); 
        // Compruebo que el comercio exista
        if (!data){
            handleHttpError(res,"COMMERCE_NOT_FOUND",403)
        }
        res.status(200).json(data);
    }
    catch (error) {
        handleHttpError(res,"ERROR_GET_COMERCIO_BY_CIF",403)
    }
}

// Función para crear un comercio
const createComercio = async (req, res) => {
    try {
        const comercio = matchedData(req);
        // Creo el comercio
        const dataCommerce = await commerceModel.create(comercio); 
        
        // Creo un token de comercio
        const data = {
            token : await tokenSignCommerce(dataCommerce),
            commerce: dataCommerce
        }

        res.status(200).json(data);
    }
    catch (error) {
        handleHttpError(res,"ERROR_CREATE_COMERCIO",403)
    }
}

// Función para modificar un comercio
const modifyComercio = async (req, res) => {
    try {
        const {cifId,...comercio} = matchedData(req);
        
        // Modifico el comercio
        const data = await commerceModel.findOneAndUpdate({cif:cifId}, comercio, {new: true}); 

        if (!data){
            handleHttpError(res,"COMMERCE_NOT_FOUND",403)
        }

        res.status(200).json(data);
    }
    catch (error) {
        handleHttpError(res,"ERROR_UPDATE_COMERCIO",403)
    }
}

// Función para eliminar un comercio
const deleteComercio = async (req, res) => {
    try {
        const {cif} = matchedData(req)
        // Recibo el hard de la query y si es true, elimino el comercio de la base de datos, si no, solo lo marco como eliminado
        const hard = req.query.hard; 
        const hardLowerCase = hard.toLowerCase()
        // Compruebo que el comercio exista
        if (!await commerceModel.findOne({cif})){
            handleHttpError(res,"COMMERCE_NOT_FOUND",403)
        }

        if (hardLowerCase === "true") {
            // Elimino el comercio de forma física
            await commerceModel.findOneAndDelete({cif}); 
            res.status(200).json({message: "COMMERCE_DELETED_PHISICALY"})
        }
        else if (hardLowerCase==="false"){
            // Elimino el comercio de forma lógica
            await commerceModel.delete({cif}); 
            res.status(200).json({message: "COMMERCE_DELETED_LOGICALY"});
        } else if (!hardLowerCase){
            handleHttpError(res,"NO_HARD_VALUE",403)
            return
        } else{
            handleHttpError(res,"INVALID_HARD_VALUE",403)
            return
        }
         
    }
    catch (error) {
        handleHttpError(res,"ERROR_DELETE_COMERCIO",403)
    }
}

// Exporto los métodos
module.exports = {
    getComercios, getComercioByCif,
    createComercio, modifyComercio,
    deleteComercio
};