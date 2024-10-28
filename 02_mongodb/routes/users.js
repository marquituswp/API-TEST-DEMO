// Rutas de usuarios
const express = require("express")
const router = express.Router()
const {getUsers,modifyUsers,deleteUser,modifyUserRole} = require("../controllers/users")
const {validateUpdateUser,validateDeleteUser,validateUpdateRole} = require("../validators/users")
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
*           '304':
*               description: Error getting Users
*/
router.get("/",getUsers)

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
*                       $ref: "#/components/schemas/userRole"
*       responses:
*           '200':
*               description: Return a message that indicates the role has been changed
*           '304':
*               description: Error updating the role
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
*                       $ref: "#/components/schemas/user"
*       responses:
*           '200':
*               description: Return the new User info
*           '304':
*               description: Error updating User
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
*           '304':
*               description: Error deleting User
*/
router.delete("/:id",authUser,validateDeleteUser,deleteUser)

module.exports = router