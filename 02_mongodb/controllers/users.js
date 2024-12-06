// Controladores de usuarios
const {userModel,webModel} = require("../models")
const web = require("../models/web")
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
        const {...body} = matchedData(req)
        // Obtengo el id del usuario logueado desde el token
        const id = req.user._id
        // Compruebo que el usuario exista
        const user = await userModel.findById({_id:id})
        if(!user){
            handleHttpError(res,"USER_NOT_FOUND",403)
            return
        }
        // Compruebo si se ha modificado la contraseña, en caso afirmativo la encripto
        if(body.password){
            const hashedPassword = await encrypt(body.password)
            body.password = hashedPassword
        }
        // Actualizo el usuario
        const data = await userModel.findByIdAndUpdate(id,body,{new:true})

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
        const id = req.user._id
        // Compruebo que el usuario exista
        const user = await userModel.findById({_id:id})
        if(!user){
            handleHttpError(res,"USER_NOT_FOUND",403)
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

// Función para obtener los comercios de una ciudad
const getWebCity = async (req,res) =>{
    try{
        // Obtengo los datos 
        const {city,interests} = matchedData(req)
        const order = req.query.order
        // Creo una expresión regular para buscar la ciudad y los intereses solo por una letra
        const cityRegex = new RegExp(city, "i"); 
        const interestsRegex = new RegExp(interests, "i");
        let webs=null
        // Busco web en funcion de que se haya pasado la ciudad y los intereses
        if(city !== "{city}" && interests !== "{interests}"){
            webs = await webModel.find({ city: cityRegex,activity: interestsRegex });
        }else if(interests !== "{interests}"){
            webs = await webModel.find({ activity: interestsRegex });
        }else if(city !== "{city}"){
            webs = await webModel.find({ city: cityRegex });
        }else{
            webs = await webModel.find({})
        }

        // Compruebo que haya comercios en la ciudad
        if(!webs){
            handleHttpError(res,"NO_COMMERCES",403)
            return
        }
        // Ordeno los comercios en funcion de los reviews
        if (order === "true") {
            // Ordenar de mayor a menor en base a `reviews.scoring`
            webs.sort((a, b) => {
            const scoreA = (a.reviews && a.reviews.length > 0) ? a.reviews[0].scoring : 0; 
            const scoreB = (b.reviews && b.reviews.length > 0) ? b.reviews[0].scoring : 0; 
            return scoreB - scoreA; 
        });
          }
        res.status(200).json(webs)
        
    }catch(error){
        handleHttpError(res,"ERROR_GETTING_COMMERCES_CITY",403)
    }
}

// Función para añadir una review a una web
const reviewWeb = async (req,res) => {
    try{
        const {webId,scoring,review} = matchedData(req)
        const web = await webModel.findById({_id:webId})
        // Compruebo que la web existe
        if(!web){
            handleHttpError(res,"WEB_NOT_FOUND",403)
            return
        }
        // Añado la review a la web
        const reviews_data = web.reviews
        // Creo un objeto con la review y lo añado al array de reviews
        const data = {
            scoring:scoring,
            review:review
        }
        reviews_data.push(data)
        // Calculo la media de las reviews
        const webPoints = reviews_data.map(review => review.scoring).reduce((a,b)=>a+b,0)/reviews_data.length
        // Actualizo la web con las reviews y los puntos
        const webReviewed = await webModel.findByIdAndUpdate({_id:webId},{reviews:reviews_data,points:webPoints},{new:true})
        res.status(200).json({message: "Web Reviewed" , web: webReviewed})

    }catch(error){
        handleHttpError(res,"ERROR_REVIEWING_WEB",403)
    }
}

module.exports = {getUsers,modifyUsers,deleteUser,modifyUserRole,getWebCity,reviewWeb}