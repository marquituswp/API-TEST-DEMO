// Cargo el modelo de comercio de forma directa
const comercioModel = require('../models/comercio');
const {matchedData} = require("express-validator")
const {handleHttpError} = require("../utils/handleError")

const getComercios = async (req, res) => {
    try {
        const order = req.query.order
        // Recibo el order de la query y lo uso en el sort, si order es true, ordeno por cif, si no, no ordeno
        const data = await comercioModel.find({}).  
        sort(order ? {cif: 1} : {});

        if (!data){
            handleHttpError(res,"No hay comercios",404)
        }

        res.status(200).json(data);
    }
    catch (error) {
        handleHttpError(res,"ERROR_GET_COMERCIO",403)
    }
}

const getComercioByCif = async (req, res) => {
    try {
        const {cif} = matchedData(req)
        // Busco el comercio por el cif
        const data = await comercioModel.findOne({cif}); 
        // Compruebo que el comercio exista
        if (!data){
            handleHttpError(res,"Comercio no encontrado",404)
        }
        res.status(200).json(data);
    }
    catch (error) {
        handleHttpError(res,"ERROR_GET_COMERCIO_BY_CIF",403)
    }
}

const createComercio = async (req, res) => {
    try {
        const comercio = matchedData(req);
        // Creo el comercio
        const data = await comercioModel.create(comercio); 
        
        if (!data){
            handleHttpError(res,"Comercio no encontrado",404)
        }

        res.status(201).json(data);
    }
    catch (error) {
        handleHttpError(res,"ERROR_CREATE_COMERCIO",403)
    }
}

const modifyComercio = async (req, res) => {
    try {
        const {cifId,...comercio} = matchedData(req);
        
        // Modifico el comercio
        const data = await comercioModel.findOneAndUpdate({cif:cifId}, comercio, {new: true}); 

        if (!data){
            handleHttpError(res,"Comercio no encontrado",404)
        }

        res.status(200).json(data);
    }
    catch (error) {
        handleHttpError(res,"ERROR_UPDATE_COMERCIO",403)
    }
}

const deleteComercio = async (req, res) => {
    try {
        const {cif} = matchedData(req)
        // Recibo el hard de la query y si es true, elimino el comercio de la base de datos, si no, solo lo marco como eliminado
        const hard = req.query.hard; 
        // Compruebo que el comercio exista
        if (!await comercioModel.findOne({cif})){
            handleHttpError(res,"Comercio no encontrado",404)
        }
        // Elimino el comercio de la base de datos
        if (hard === "true") {
            // Elimino el comercio de forma física
            await comercioModel.findOneAndDelete({cif}); 
            res.status(200).json({message: "Comercio eliminado de forma física"})
        }
        else if (hard==="false"){
            // Marco el comercio como eliminado, elimino de forma lógica
            await comercioModel.delete({cif}); 
            res.status(200).json({message: "Comercio eliminado de forma lógica"});
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