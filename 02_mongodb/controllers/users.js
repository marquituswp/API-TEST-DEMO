// Controladores de usuarios
const {userModel} = require("../models")
const {handleHttpError} = require("../utils/handleError")
const {encrypt} = require("../utils/handlePassword")
const {matchedData} = require("express-validator")

// Función para obtener todos los usuarios
const getUsers = async (req,res)=>{
    try{
        data = await userModel.find({})
        res.status(200).json(data)
    }catch(error){
        handleHttpError(res,"ERROR_GET_USERS",403)
    }
}

// Función para modificar un usuario
const modifyUsers = async (req,res) =>{
    try{
        const {id, ...body} = matchedData(req)
        // encripto la contraseña (si la modifica)
        const hashedPassword = await encrypt(body.password)
        body.password = hashedPassword
        const data = await userModel.findByIdAndUpdate(id,body,{new:true})
        // Compruebo que el usuario exista
        if (!data){
            handleHttpError(res,"USER_NOT_EXISTS",403)
            return
        }

        res.status(200).json({message:"User updated",
            data:data
        })
    }catch(error){
        handleHttpError(res,"ERROR_UPDATING_USER",403)
    }
}

// Función para eliminar un usuario
const deleteUser = async (req,res) =>{
    try{
        const {id} = matchedData(req)
        // Compruebo que el usuario exista
        const user = await userModel.findById({_id:id})
        if(!user){
            handleHttpError(res,"USER_NOT_FOUND",403)
            return
        }
        // Compruebo que el usuario que intenta borrar sea el mismo que el logueado (solo se puede borrar a uno mismo)
        if (user.email !== req.user.email){
            handleHttpError(res,"CAN'T_DELETE_OTHERS",403)
            return
        }
        // Borro el usuario
        await userModel.findOneAndDelete({_id:id})
        res.status(200).json({message:"User deleted succesfully"})
    }catch(error){
        handleHttpError(res,"ERROR_DELETING_USER",403)
    }
}

// Función para modificar el rol de un usuario
const modifyUserRole = async (req,res)=>{
    try{
        const {email,role} =matchedData(req)
        // Compruebo que el usuario exista
        const user = await userModel.findOneAndUpdate({email}, {role}, {new:true})
        if(!user){
            handleHttpError(res,"USER_NOT_FOUND",403)
            return
        }
        res.status(200).json({message:"Role changed"})
    }catch(error){
        handleHttpError(res,"ERROR_UPDATING_ROLE",403)
    }
}

module.exports = {getUsers,modifyUsers,deleteUser,modifyUserRole}