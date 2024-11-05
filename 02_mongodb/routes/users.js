// Rutas de usuarios
const express = require("express")
const router = express.Router()
const {getUsers,modifyUsers,deleteUser,modifyUserRole,getWebCity,reviewWeb} = require("../controllers/users")
const {validateUpdateUser,validateDeleteUser,validateUpdateRole,validateGetWeb,validateReviewWeb} = require("../validators/users")
// Importamos el middleware de autenticación de usuario, para proteger las rutas
const {authUser} = require("../middlewares/session")
// Importamos el middleware de comprobación de roles de usuario, SOLO ADMIN puede cambiar roles
const checkRolUser = require("../middlewares/rol")

// RUTA GET /users
/**
*   @openapi
*   /users:
*   get:
*       tags:
*       - Users
*       summary: Get all Users
*       responses:
*           '200':
*               description: Return a list of Users
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/User"
*           '403':
*               description: Error getting Users
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/User"
*/
router.get("/",getUsers)

/**
*   @openapi
*   /users/web/{city}/{interests}?:
*   get:
*       tags:
*       - Users
*       summary: Get all Web in the User city
*       parameters:
*           - in: path
*             name: city
*             schema: 
*                type: string
*             required: true
*             description: The city of the Webs
*           - in: path
*             name: interests
*             schema: 
*                type: string
*             required: false
*             description: The interests of the Webs
*           - in: query
*             name: order
*             schema:
*               type: string
*               enum: ["true","false"]
*             required: true
*             description: Choose "true" to sort Commerces by CIF 
*       responses:
*           '200':
*               description: Return a list of Webs
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Web"
*           '403':
*               description: Error getting Webs in the city
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/UserWeb"
*/
router.get("/web/:city/:interests?",validateGetWeb,getWebCity)

// RUTA PUT /users/role
/**
*   @openapi
*   /users/role:
*   put:
*       tags:
*       - Users
*       summary: Update user role
*       description: Update the user role with an authorized User (an ADMIN)
*       security:
*          - bearerAuth: []
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/User/userRole"
*       responses:
*           '200':
*               description: Return a message that indicates the role has been changed
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/User/UserUpdateRole"
*           '403':
*               description: Error updating Users role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/UserUpdateRole"
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
router.put("/role",authUser,checkRolUser(["admin"]),validateUpdateRole,modifyUserRole)

// RUTA PUT /users/{id}
/**
*   @openapi
*   /users/{id}:
*   put:
*       tags:
*       - Users
*       summary: Update User
*       description: Update all the information of the user
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: id
*             schema: 
*                type: string
*             required: true
*             description: The ID of the user want to update
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/User"
*       responses:
*           '200':
*               description: Return the new User info
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/User/UserUpdate"
*           '403':
*               description: Error updating User
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/UserUpdate"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.put("/:id",authUser,validateUpdateUser,modifyUsers)

// RUTA DELETE /users/{id}
/**
*   @openapi
*   /users/{id}:
*   delete:
*       tags:
*       - Users
*       summary: Delete User phisicaly by ID
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: id
*             schema: 
*                type: string
*             required: true
*             description: The ID of the user want to update. You can only delete yourself
*       responses:
*           '200':
*               description: Return a message that indicates the user has been deleted
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/User/UserDelete"
*           '403':
*               description: Error deleting User
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/User/UserDelete"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.delete("/:id",authUser,validateDeleteUser,deleteUser)

// RUTA PUT /users/reviewWeb/{webId}
/**
*   @openapi
*   /users/reviewWeb/{webId}:
*   put:
*       tags:
*       - Users
*       summary: Review a Web
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: webId
*             schema: 
*                type: string
*             required: true
*             description: The ID of the web want to review
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/User/reviewWeb"
*       responses:
*           '200':
*               description: Return a success message and the web reviewed
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/User/UserReviewWeb"
*           '403':
*               description: Error reviewing Web
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/UserReviewWeb"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.put("/reviewWeb/:webId",authUser,validateReviewWeb, reviewWeb)

module.exports = router