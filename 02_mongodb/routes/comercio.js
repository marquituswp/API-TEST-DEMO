// Rutas de comercio
const express = require("express")
const {validatorCreateComercio,validatorGetComercio,validatorUpdateComercio,validatorDeleteComercio, validatorRestoreCommerce} = require("../validators/comercio")
// Importamos el middleware de comprobación de roles de usuario, SOLO ADMIN puede acceder a estas rutas
const checkRolUser = require("../middlewares/rol")
// Importamos el middleware de autenticación de usuario, para proteger las rutas
const {authUser} = require("../middlewares/session")
const router = express.Router()
const { validatorMail } = require("../validators/mail")
const { send } = require("../controllers/mail")
// Recibimos las funciones de los controladores y las usamos en las rutas
const { getComercios, getComercioByCif, createComercio,modifyComercio, deleteComercio, restoreComercio } = require("../controllers/comercio")

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
*       parameters:
*           - in: query
*             name: order
*             schema:
*               type: string
*               enum: ["true","false"]
*             required: true
*             description: Choose "true" to sort Commerces by CIF        
*       responses:
*           '200':
*               description: Return the commerce info
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Commerce"
*           '403':
*               description: Error getting Commerces
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/Commerce"
*           '400':
*               description: User not allowed to change roles
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/400"
*           '401':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/401"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
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
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Commerce"
*           '403':
*               description: Error getting Commerce
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/Commerce"
*           '400':
*               description: User not allowed to change roles
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/400"
*           '401':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/401"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
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
*                       $ref: "#/components/schemas/Commerce"
*       responses:
*           '200':
*               description: Return the new Commerce with a TOKEN
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Commerce/CommerceCreated"
*           '403':
*               description: Error creating Commerce
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/CommerceCreated"
*           '400':
*               description: User not allowed to change roles
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/400"
*           '401':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/401"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
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
*                       $ref: "#/components/schemas/Commerce"
*       responses:
*           '200':
*               description: Return the new Commerce info
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Commerce"
*           '403':
*               description: Error updating Commerce
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/CommerceUpdate"
*           '400':
*               description: User not allowed to change roles
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/400"
*           '401':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/401"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
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
*               type: string
*               enum: ["true","false"]
*             required: true
*             description: Choose "hard" to delete phisicaly or "false" to soft delete 
*       responses:
*           '200':
*               description: Return a delete message info
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Commerce/CommerceDeleted"
*           '403':
*               description: Error deleting Commerce
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/CommerceDelete"
*           '400':
*               description: User not allowed to change roles
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/400"
*           '401':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/RolUser/401"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.delete("/:cif",authUser,checkRolUser(["admin"]),validatorDeleteComercio, deleteComercio)

// RUTA PATCH /comercio/restore/{cif}
/**
*   @openapi
*   /comercio/restore/{cif}:
*   patch:
*       tags:
*       - Commerce
*       summary: Restore a Commerce by CIF
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: cif
*             schema: 
*                type: string
*             required: true
*             description: The CIF of the Commerce
*       responses:
*           '200':
*               description: Return the Commerce info restored
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Commerce/CommerceRestored"
*           '403':
*               description: Error restoring Commerce
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/CommerceRestored"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.patch("/restore/:cif",authUser,checkRolUser(["admin"]),validatorRestoreCommerce, restoreComercio)

// RUTA PARA ENVIAR CORREO
/**
*   @openapi
*   /comercio/mail:
*   post:
*       tags:
*       - Commerce
*       summary: Send an email to an interested user (⚠️ Currently Not Working)
*       description: "**⚠️ Warning:** This route is currently not functional. The email sending service is under maintenance."
*       security:
*           - bearerAuth: []
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/Mail"
*       responses:
*           '200':
*               description: Return the email sent
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Mail"
*           '403':
*               description: Error Sending Mail
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/Mail"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.post("/mail", authUser,checkRolUser(["admin"]), validatorMail, send)


module.exports = router

