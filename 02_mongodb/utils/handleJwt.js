// Utilidad para manejar JWT
const jwt = require("jsonwebtoken")
const {handleHttpError} = require("../utils/handleError")
const JWT_SECRET = process.env.JWT_SECRET

// Función para firmar un token con el usuario
const tokensign = async (user)=>{

    const sign = jwt.sign(
        {
            _id:user._id,
            role:user.role
        },
        JWT_SECRET,
        {
            expiresIn:"24h"
        }
    )
    return sign
}

// Función para firmar un token con el comercio
const tokenSignCommerce = async (commerce)=>{

    const sign = jwt.sign(
        {
            cif:commerce.cif
        },
        JWT_SECRET,
        {
            expiresIn:"24h"
        }
    )
    return sign
}

// Función para verificar un token
const verifyToken = async (tokenJwt) =>{
    try {

        return jwt.verify(tokenJwt, JWT_SECRET)

    } catch (err) {

        handleHttpError(res,"ERRROR_VERIFYTOKEN",403)
    }
}

module.exports = {tokensign,verifyToken,tokenSignCommerce}