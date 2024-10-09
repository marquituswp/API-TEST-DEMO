const express = require("express")

const router = express.Router()

// Recibimos las funciones de los controladores y las usamos en las rutas
const { getComercios, getComercioByCif, createComercio,modifyComercio, deleteComercio } = require("../controllers/comercio")

router.get("/", getComercios)

router.get("/:cif", getComercioByCif)

router.post("/", createComercio)

router.put("/:cif", modifyComercio)

router.delete("/:cif", deleteComercio)

module.exports = router

