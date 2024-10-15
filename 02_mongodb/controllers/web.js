const {webModel} = require("../models")
const {matchedData} = require("express-validator")
const {handleHttpError}=require("../utils/handleError")

const getWebById = async (req,res) =>{

    try{

        const {id} = matchedData(req)
        const data = await webModel.findById({_id:id})

        if(!data){
            handleHttpError(res,"Web no encontrada",403)
            return
        }

        res.status(200).json(data)

    }catch(error){
        handleHttpError(res,"ERROR_GET_WEB",403)
    }

}

const createWeb = async (req,res) =>{

    try{
        const web = matchedData(req)

        const data = await webModel.create(web)

        res.status(200).json(data)
    }catch(error){
        handleHttpError(res,"ERROR_CREATE_WEB",403)
    }

}

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

const deleteWeb = async (req,res) =>{

    try{
        const {id} = matchedData(req)
        const {typeDelete} = req.query

        if(!await webModel.findById({_id:id})){
            handleHttpError(res,"Web no encontrada",404)
            return
        }

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

const uploadImage = async (req,res) =>{
    try{
        const {id} = req.params
        const {file} = req
        
        const url = process.env.PUBLIC_URL + "/" + file.filename

        const web = await webModel.findById({_id:id})
        const images_url = web.images
    
        images_url.push(url)
    
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