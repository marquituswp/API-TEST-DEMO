// Rutas de autenticación
const express = require("express")
const router = express.Router()
const {validateLoginUser, validateRegisterUser}=require("../validators/auth")
const {registerUser,loginUser} = require("../controllers/auth")

// RUTA POST /auth/register
/**
*   @openapi
*   /auth/register:
*   post:
*       tags:
*       - Auth
*       summary: Register an User
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/Auth"
*       responses:
*           '200':
*               description: Return a User registered with its token
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Auth/authResponse"
*           '403':
*               description: Error registering User
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/auth"
*/
router.post("/register",validateRegisterUser,registerUser)

// RUTA POST /auth/login
/**
*   @openapi
*   /auth/login:
*   post:
*       tags:
*       - Auth
*       summary: Login 
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/Auth/login"
*       responses:
*           '200':
*               description: Return a User registered with its token
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Auth/authResponse"
*           '403':
*               description: Error login User
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/login"
*/
router.post("/login",validateLoginUser,loginUser)

module.exports = router

