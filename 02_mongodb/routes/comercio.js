const express = require("express")
const {validatorCreateComercio,validatorGetComercio,validatorUpdateComercio,validatorDeleteComercio} = require("../validators/comercio")
const router = express.Router()

// Recibimos las funciones de los controladores y las usamos en las rutas
const { getComercios, getComercioByCif, createComercio,modifyComercio, deleteComercio } = require("../controllers/comercio")

router.get("/", getComercios)

router.get("/:cif",validatorGetComercio, getComercioByCif)

router.post("/",validatorCreateComercio, createComercio)

router.put("/:cifId",validatorUpdateComercio, modifyComercio)

router.delete("/:cif",validatorDeleteComercio, deleteComercio)

module.exports = router

