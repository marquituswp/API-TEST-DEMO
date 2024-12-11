const express = require("express")
const fs = require("fs")

const router = express.Router()

// Función para quitar la extensión de los archivos
const removeExtension = (fileName) => {

    return fileName.split('.').shift()
}

// Recorremos los archivos de la carpeta y los usamos como rutas
fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file)

    if (name !== 'index') {

        router.use('/' + name, require('./' + name)) 

    }
})

module.exports = router