// Controladores de la entidad web
const { webModel, userModel } = require("../models")
const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")

// Función para obtener todas las webs
const getWebs = async (req, res) => {
    try {
        const data = await webModel.find({})
        const order = req.query.order
        //Si no hay webs, lanzamos un error
        if (!data) {
            handleHttpError(res, "NO_DATA", 403)
            return
        }
        //Si el parámetro order es true, ordenamos las webs por puntos
        if (order === "true") {
            data.sort((a, b) => {
                return (a.points < b.points) ? 1 : -1;
            });
        }
        res.status(200).json(data);
    }
    catch (error) {
        handleHttpError(res, "ERROR_GET_COMERCIO", 403)
    }
}

// Función para obtener una web por su id
const getWebById = async (req, res) => {

    try {
        //Extraemos el id de la web y lo matcheamos con ayuda del validator
        const { id } = matchedData(req)
        const data = await webModel.findById({ _id: id })

        //Si no existe la web, lanzamos un error
        if (!data) {
            handleHttpError(res, "WEB_NOT_FOUND", 403)
            return
        }

        res.status(200).json(data)

    } catch (error) {
        handleHttpError(res, "ERROR_GET_WEB", 403)
    }

}

// Función para crear una web
const createWeb = async (req, res) => {

    try {
        const web = matchedData(req)
        //Añadimos el cif del comercio a la web (para saber a qué comercio pertenece)
        console.log(req.commerce)
        web["cifCommerce"] = req.commerce.cif
        console.log(web)
        const data = await webModel.create(web)
        res.status(200).json(data)
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_WEB", 403)
    }

}

// Función para actualizar una web
const updateWeb = async (req, res) => {

    try {
        const { ...web } = matchedData(req)
        // Comprobamos si la web existe
        const data = await webModel.findOne({ cifCommerce: req.commerce.cif }) // Buscamos la web por el cif del comercio
        if (!data || data.length === 0) {
            handleHttpError(res, "WEB_NOT_FOUND", 403)
            return
        }
        const dataUpdated = await webModel.findOneAndUpdate({ cifCommerce: req.commerce.cif }, web, { new: true })

        res.status(200).json(dataUpdated)
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_WEB", 403)
    }

}

// Función para eliminar una web
const deleteWeb = async (req, res) => {

    try {
        //Extraemos el tipo de eliminación
        const { hard } = req.query
        const hardLowerCase = hard.toLowerCase()
        const data = await webModel.findOne({ cifCommerce: req.commerce.cif })
        //Si no existe la web, lanzamos un error
        if (!data || data.length === 0) {
            handleHttpError(res, "WEB_NOT_FOUND", 403)
            return
        }
        if (hardLowerCase === "true") {
            // Elimino la web de forma física
            await webModel.findOneAndDelete({ cifCommerce: req.commerce.cif });
            res.status(200).json({ message: "WEB_DELETED_PHISICALY" })
        }
        else if (hardLowerCase === "false") {
            // Elimino la web de forma lógica
            await webModel.delete({ cifCommerce: req.commerce.cif });
            res.status(200).json({ message: "WEB_DELETED_LOGICALY" });
        } else {
            //Si el tipo de eliminación no es válido, lanzamos un error
            handleHttpError(res, "INVALID_HARD_VALUE", 403)
            return
        }
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_WEB", 403)
    }

}

// Función para restaurar una web
const restoreWeb = async (req, res) => {
    try {
        // Comprobamos si la web ha sido eliminada
        const data = await webModel.findOne({ cifCommerce: req.commerce.cif})
        if (!data) {
            // Si ha sido eliminada, la restauramos
            const webRestored = await webModel.restore({ cifCommerce: req.commerce.cif })
            // Comprobamos si la web ha sido restaurada
            if (webRestored.modifiedCount === 1) {
                // Extraemos la web restaurada
                const web = await webModel.findOne({ cifCommerce: req.commerce.cif })
                
                res.status(200).json({ message: "WEB_RESTORED", web: web })
                return
            }
            handleHttpError(res, "WEB_NOT_EXISTENT", 403)
            return
        }
        handleHttpError(res, "WEB_NOT_DELETED", 403)
        return

    } catch (error) {
        handleHttpError(res, "ERROR_RESTORE_WEB", 403)
    }
}

// Función para subir una imagen a una web
const uploadImage = async (req, res) => {
    try {
        const { file } = req
        if (!file) {
            handleHttpError(res, "NO_FILE", 403)
            return
        }
        // //creamos la url de la imagen
        // const url = process.env.PUBLIC_URL + "/" + file.filename
        const url = "/uploads/" + file.filename
        //Comprobamos si la web existe
        const data = await webModel.findOne({ cifCommerce: req.commerce.cif })
        if (!data) {
            handleHttpError(res, "WEB_NOT_FOUND", 403)
            return
        }

        // Extraemos el array de imágenes de la web
        const images_url = data.images
        const textsData = data.texts
        //Añadimos la nueva imagen al array
        images_url.push(url)
        //Si se añade un texto, lo añadimos al array de textos
        if (req.body.text) {
            let texts = [];
            
            // EN BACKEND (CONTROLADOR) se envia un solo string separado por comas
            // EN FRONTEND (VISTA) se envia un array de strings
            // Maneja si `text` es un array o una cadena
            if (Array.isArray(req.body.text)) {
                texts = req.body.text; // Si es un array, úsalo directamente
            } else if (typeof req.body.text === "string") {
                texts = req.body.text.split(",").map(t => t.trim()); // Divide la cadena y limpia espacios
            }

            // Añadimos los textos al array existente
            texts.forEach(text => {
                if (text && !textsData.includes(text)) {
                    textsData.push(text); // Evita duplicados
                }
            });

        }
        //Actualizamos la web con la nueva imagen
        const dataUpdated = await webModel.findOneAndUpdate({ cifCommerce: req.commerce.cif }, { images: images_url, texts: textsData }, { new: true })

        res.status(200).json(dataUpdated)
    }
    catch (error) {
        handleHttpError(res, "ERROR_UPLOAD_IMAGE", 403)
    }
}

// Función para obtener los usuarios interesados en las webs de un comercio
const getUsersWeb = async (req, res) => {
    try {
        //Obtenemos las webs del comercio
        const webs = await webModel.find({ cifCommerce: req.commerce.cif })
        if (!webs || webs.length === 0) {
            //Si no hay webs, lanzamos un error
            handleHttpError(res, "NOT_COMMERCE_WEBS", 403)
            return
        }
        //Extraemos las actividades de las webs
        const webActivities = webs.map(web => web.activity)
        const webCities = webs.map(web => web.city)
        //Obtenemos los usuarios que tienen permitido recibir ofertas y que están interesados en las actividades de las webs del comercio
        const users = await userModel.find({
            allowOffers: true,
            interests: {
                $in: webActivities.map(activity => new RegExp(activity, 'i')) // Busca coincidencias (surf, surfing, etc.)
            },
            city: {
                $in: webCities.map(city => new RegExp(city, 'i')) // Busca coincidencias (Madrid, madrid, etc.)
            }
        });
        //Si no hay usuarios interesados, lanzamos un error
        if (users.length === 0) {
            handleHttpError(res, "NO_USERS_INTERESTED", 403)
            return
        }
        //Extraemos los emails de los usuarios interesados
        const usersMails = users.map(user => user.email)
        res.status(200).json({ message: "USERS_INTERESTED:", emails: usersMails })
    } catch (error) {
        handleHttpError(res, "ERROR_GETTING_USERSWEB", 403)
    }
}


module.exports = {
    getWebById, createWeb, updateWeb, deleteWeb, uploadImage, getWebs, getUsersWeb, restoreWeb
}