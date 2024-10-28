// Rutas de comercio
const express = require("express")
const {validatorCreateComercio,validatorGetComercio,validatorUpdateComercio,validatorDeleteComercio} = require("../validators/comercio")
// Importamos el middleware de comprobación de roles de usuario, SOLO ADMIN puede acceder a estas rutas
const checkRolUser = require("../middlewares/rol")
// Importamos el middleware de autenticación de usuario, para proteger las rutas
const {authUser} = require("../middlewares/session")
const router = express.Router()

// Recibimos las funciones de los controladores y las usamos en las rutas
const { getComercios, getComercioByCif, createComercio,modifyComercio, deleteComercio } = require("../controllers/comercio")

// RUTA GET /comercio
/**
*   @openapi
*   /comercio:
*   get:
*       tags:
*       - Commerce
*       summary: Get all commerce
*       description: Only admin can get all commerce
*       security:
*           - bearerAuth: []
*       responses:
*           '200':
*               description: Return the commerce info
*           '304':
*               description: Error getting Commerces
*/
router.get("/",authUser,checkRolUser(["admin"]),getComercios)

// RUTA GET /comercio/{cif}
/**
*   @openapi
*   /comercio/{cif}:
*   get:
*       tags:
*       - Commerce
*       summary: Get Commerce by CIF
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: cif
*             schema: 
*                type: string
*             required: true
*             description: The CIF of the commerce
*       responses:
*           '200':
*               description: Return the Commerce info
*           '304':
*               description: Error getting Commerce
*/
router.get("/:cif",authUser,checkRolUser(["admin"]),validatorGetComercio, getComercioByCif)

// RUTA POST /comercio
/**
*   @openapi
*   /comercio:
*   post:
*       tags:
*       - Commerce
*       summary: Create a Commerce
*       description: Create a Commerce, create a TOKEN with de cif in the payload data for further activities
*       security:
*           - bearerAuth: []
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/commerce"
*       responses:
*           '200':
*               description: Return the new Commerce with a TOKEN
*           '304':
*               description: Error creating Commerce
*/
router.post("/",authUser,checkRolUser(["admin"]),validatorCreateComercio, createComercio)

// RUTA PUT /comercio/{cifId}
/**
*   @openapi
*   /comercio/{cifId}:
*   put:
*       tags:
*       - Commerce
*       summary: Update Commerce by CIF
*       description: Update all the information of the Commerce
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: cifId
*             schema: 
*                type: string
*             required: true
*             description: The CIF of the Commerce want to update
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/commerce"
*       responses:
*           '200':
*               description: Return the new Commerce info
*           '304':
*               description: Error updating Commerce
*/
router.put("/:cifId",authUser,checkRolUser(["admin"]),validatorUpdateComercio, modifyComercio)

// RUTA DELETE /comercio/{cif}
/**
*   @openapi
*   /comercio/{cif}:
*   delete:
*       tags:
*       - Commerce
*       summary: Delete Commerce by CIF
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: cif
*             schema: 
*                type: string
*             required: true
*             description: The CIF of the Commerce
*           - in: query
*             name: hard
*             schema:
*                type: string
*                example: true/false
*             required: true
*             description: Type of delete
*       responses:
*           '200':
*               description: Return a delete message info
*           '304':
*               description: Error deleting Commerce
*/
router.delete("/:cif",authUser,checkRolUser(["admin"]),validatorDeleteComercio, deleteComercio)

module.exports = router

