// Cargo el modelo de comercio de forma directa
const comercioModel = require('../models/comercio');

const getComercios = async (req, res) => {
    try {
        const order = req.query.order;
        // Recibo el order de la query y lo uso en el sort, si order es true, ordeno por cif, si no, no ordeno
        const data = await comercioModel.find({}).  
        sort(order ? {cif: 1} : {});

        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al obtener los comercios"});
    }
}

const getComercioByCif = async (req, res) => {
    try {
        const cif = req.params.cif;
        // Busco el comercio por el cif
        const data = await comercioModel.findOne({cif: cif}); 
        // Compruebo que el comercio exista
        if (!data) {
            res.status(400).json({error: "El comercio no existe"});
            return;
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al obtener el comercio"});
    }
}

const createComercio = async (req, res) => {
    try {
        const comercio = req.body;
        // Compruebo que los datos del comercio no estén vacíos y que el comercio no exista
        if (!comercio.cif || !comercio.name || !comercio.email || !comercio.phone || !comercio.page_id) {
            res.status(400).json({error: "Faltan datos"});
            return;
        }else if (await comercioModel.findOne({cif: comercio.cif})) {
            res.status(400).json({error: "El comercio ya existe"});
            return;
        }else if (await comercioModel.findOne({page_id: comercio.page_id})) {
            res.status(400).json({error: "El page_id ya está en uso"});
            return;
        }
        // Creo el comercio
        const data = await comercioModel.create(comercio); 
        
        res.status(201).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al crear el comercio"});
    }
}

const modifyComercio = async (req, res) => {
    try {
        const cif = req.params.cif;
        const comercio = req.body;
        // Comprobaciones para modificar el comercio
        if (!await comercioModel.findOne({cif: cif})) {
            res.status(400).json({error: "El comercio no existe"});
            return;
        }else if (comercio.deleted) {
            res.status(400).json({error: "No puedes modificar un comercio eliminado de forma lógica"});
            return;
        } else if (!comercio.name || !comercio.email || !comercio.phone || !comercio.page_id || !comercio.cif) {
            res.status(400).json({error: "Faltan datos"});
            return;
        } else if (comercio.cif && comercio.cif !== cif) {
            res.status(400).json({error: "No puedes modificar el cif del comercio"});
            return;
        } else if (await comercioModel.findOne({page_id: comercio.page_id, cif: {$ne: cif}})) {
            res.status(400).json({error: "El page_id ya está en uso"});
            return;
        }
        
        // Modifico el comercio
        const data = await comercioModel.findOneAndUpdate({cif: cif}, comercio, {new: true}); 

        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al modificar el comercio"});
    }
}

const deleteComercio = async (req, res) => {
    try {
        const cif = req.params.cif;
        // Recibo el hard de la query y si es true, elimino el comercio de la base de datos, si no, solo lo marco como eliminado
        const hard = req.query.hard; 
        const comercio = await comercioModel.findOne({cif: cif});
        // Compruebo que el comercio exista
        if (!comercio) {
            res.status(400).json({error: "El comercio no existe"});
            return;
        }
        // Elimino el comercio de la base de datos
        if (hard === "true") {
            // Elimino el comercio de forma física
            await comercioModel.deleteOne({cif: cif}); 
        }
        else {
            // Compruebo si el comercio ya está eliminado de forma lógica
            if (comercio.deleted) {
                res.status(400).json({error: "El comercio ya está eliminado de forma lógica"});
                return;
            }
            // Marco el comercio como eliminado, elimino de forma lógica
            await comercioModel.findOneAndUpdate({cif: cif}, {deleted: true}); 
        }
        // Devuelvo el mensaje correspondiente
        hard === "true" ? res.status(200).json({message: "Comercio eliminado de forma física"}) : res.status(200).json({message: "Comercio eliminado de forma lógica"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al eliminar el comercio"});
    }
}

// Exporto los métodos
module.exports = {
    getComercios, getComercioByCif,
    createComercio, modifyComercio,
    deleteComercio
};