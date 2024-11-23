// Controlador de autenticación
const {userModel} = require("../models/index")
const {matchedData} = require("express-validator")
const {encrypt,compare} = require("../utils/handlePassword")
const {tokensign} = require("../utils/handleJwt")
const {handleHttpError} = require("../utils/handleError")

// Función para registrar un usuario
const registerUser = async (req,res)=>{
    try{
        req = matchedData(req)
        // Encriptar la contraseña
        const password = await encrypt(req.password)
        const body = {...req,password}
        const dataUser = await userModel.create(body)
        dataUser.set('password',undefined,{strict:false})

        // Crear un token
        const data = {
            token : await tokensign(dataUser),
            user: dataUser
        }

        res.status(200).send(data)
    }catch(error){
        handleHttpError(res,"ERROR_REGISTER_USER",403)
    }
}

// Función para loguear un usuario
const loginUser = async (req,res) =>{
    try{
        req = matchedData(req)
        const user = await userModel.findOne({email:req.email})

        // Comprobar que el usuario existe
        if(!user){
            handleHttpError(res,"USER_NOT_EXISTS",403)
            return
        }

        // Comparar la contraseña encriptada con la contraseña ingresada
        const hashedPassword = user.password
        const checkPassword = await compare(req.password,hashedPassword)

        // Comprobar que la contraseña es correcta
        if(!checkPassword){
            handleHttpError(res,"INVALID_PASSWORD",403)
            return
        }

        // Eliminar la contraseña del objeto usuario
        user.set("password",undefined,{strict:false})

        // Crear un token
        const data={
            token: await tokensign(user),
            user
        }

        res.status(200).send(data)
    }catch(error){
        handleHttpError(res,"ERROR_LOGIN_USER",403)
    }
}

module.exports = {registerUser,loginUser}