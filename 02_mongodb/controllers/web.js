const {webModel} = require("../models")
const {matchedData} = require("express-validator")
const {handleHttpError}=require("../utils/handleError")

// ruta get web por id
const getWebById = async (req,res) =>{

    try{
        //Extraemos el id de la web y lo matcheamos con ayuda del validator
        const {id} = matchedData(req)
        const data = await webModel.findById({_id:id})

        //Si no existe la web, lanzamos un error
        if(!data){
            handleHttpError(res,"Web no encontrada",403)
            return
        }

        res.status(200).json(data)

    }catch(error){
        handleHttpError(res,"ERROR_GET_WEB",403)
    }

}

// ruta post para crear web
const createWeb = async (req,res) =>{

    try{
        const web = matchedData(req)

        const data = await webModel.create(web)

        res.status(200).json(data)
    }catch(error){
        handleHttpError(res,"ERROR_CREATE_WEB",403)
    }

}

// ruta put para actualizar web
const updateWeb = async (req,res) =>{

    try{
        const {id,...web} = matchedData(req)

        const data = await webModel.findOneAndUpdate({_id:id},web,{new:true})

        if(!data){
            handleHttpError(res,"Web no encontrada",404)
            return
        }

        res.status(200).json(data)
    }catch(error){
        handleHttpError(res,"ERROR_UPDATE_WEB",403)
    }

}

// ruta delete para eliminar web
const deleteWeb = async (req,res) =>{

    try{
        const {id} = matchedData(req)
        //Extraemos el tipo de eliminación
        const {typeDelete} = req.query

        //Si no existe la web, lanzamos un error
        if(!await webModel.findById({_id:id})){
            handleHttpError(res,"Web no encontrada",404)
            return
        }

        //Si el tipo de eliminación es lógico, cambiamos el estado de la web a archivado
        if(typeDelete === 'logical'){
            await webModel.delete({_id:id})
            res.status(200).json({message: "Web archivada"})
        }else if(typeDelete ==="physical"){
            await webModel.findOneAndDelete({_id:id})
            res.status(200).json({message: "Web eliminada"})
        }
    }catch(error){
        handleHttpError(res,"ERROR_UPDATE_WEB",403)
    }
    
}

// ruta patch para subir imagen
const uploadImage = async (req,res) =>{
    try{
        const {id} = req.params
        const {file} = req

        //creamos la url de la imagen
        const url = process.env.PUBLIC_URL + "/" + file.filename

        // Extraemos el array de imágenes de la web
        const web = await webModel.findById({_id:id})
        const images_url = web.images
    
        //Añadimos la nueva imagen al array
        images_url.push(url)
    
        //Actualizamos la web con la nueva imagen
        const data = await webModel.findOneAndUpdate({_id:id},{images:images_url},{new:true})

        if(!data){
            handleHttpError(res,"Web no encontrada",404)
            return
        }

        res.status(200).json(data)
    }
    catch(error){
        handleHttpError(res,"ERROR_UPLOAD_IMAGE",403)
    }
}


module.exports={
    getWebById,createWeb,updateWeb,deleteWeb,uploadImage
}