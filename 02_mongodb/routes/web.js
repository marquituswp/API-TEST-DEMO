// Rutas de web
const express= require("express")
const {validatorCreateWeb,validatorGetWeb,validatorUpdateWeb,validatorGetWebs} = require("../validators/web")
const router = express.Router()
const uploadMiddleware = require("../utils/handleUpload")
// Importamos el middleware de autenticación de comercio, solo los comercios pueden acceder a sus webs
const {authCommerce} = require("../middlewares/session")
const {getWebs,getWebById,createWeb,updateWeb,deleteWeb,uploadImage,getUsersWeb,restoreWeb} = require("../controllers/web")

// RUTA GET /web
/**
*   @openapi
*   /web/?:
*   get:
*       tags:
*       - Web
*       summary: Get all webs
*       parameters:
*           - in: query
*             name: order
*             schema:
*               type: string
*               enum: ["true","false"]
*             required: true
*             description: Choose "true" to sort Webs by scoring 
*       responses:
*           '200':
*               description: Return all Webs
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Web/WebCreated"
*           '403':
*               description: Error getting Webs
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/WebCreated"
*/
router.get("/?",validatorGetWebs,getWebs)

// RUTA GET /web/users
/**
*   @openapi
*   /web/users:
*   get:
*       tags:
*       - Web
*       summary: Get a Users interested in the Commerce Web
*       security:
*           - bearerAuth: []
*       responses:
*           '200':
*               description: Return the Users interested in the Commerce Web
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Web/WebUsers"
*           '403':
*               description: Error getting Users
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/WebUsers"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.get("/users",authCommerce,getUsersWeb)

// RUTA GET /web/{id}
/**
*   @openapi
*   /web/{id}:
*   get:
*       tags:
*       - Web
*       summary: Get a Web by ID
*       parameters:
*           - in: path
*             name: id
*             schema: 
*                type: string
*             required: true
*             description: The ID of the Web
*       responses:
*           '200':
*               description: Return the Web info
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Web/WebCreated"
*           '403':
*               description: Error getting Web
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/WebCreated"
*/
router.get("/:id",validatorGetWeb,getWebById)

// RUTA POST /web
/**
*   @openapi
*   /web:
*   post:
*       tags:
*       - Web
*       summary: Create a Web
*       description: Create a Commerce Web, the Commerce TOKEN is required
*       security:
*           - bearerAuth: []
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/Web"
*       responses:
*           '200':
*               description: Return the new Web created
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Web/WebCreated"
*           '403':
*               description: Error creating Web
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/CreateWeb"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.post("/",authCommerce,validatorCreateWeb,createWeb)

// RUTA PUT /web
/**
*   @openapi
*   /web:
*   put:
*       tags:
*       - Web
*       summary: Update Web
*       description: Update a Commerce Web, the Commerce TOKEN of the Web is required
*       security:
*           - bearerAuth: []
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/Web/Updateweb"
*       responses:
*           '200':
*               description: Return the new Web info
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Web/WebCreated"
*           '403':
*               description: Error updating Web
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/UpdateWeb"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.put("/",authCommerce,validatorUpdateWeb,updateWeb)

// RUTA DELETE /web
/**
*   @openapi
*   /web:
*   delete:
*       tags:
*       - Web
*       summary: Delete Web 
*       description: Delte the Commerce Web , the Commerce Token is required
*       security:
*           - bearerAuth: []
*       parameters:
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
*                           $ref: "#/components/schemas/Web/WebDelete"
*           '403':
*               description: Error deleting Web
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/WebDelete"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.delete("/",authCommerce,deleteWeb)

// RUTA PATCH /web
/**
*   @openapi
*   /web:
*   patch:
*       tags:
*       - Web
*       summary: Upload an image or text to the Web
*       description: Upload an image or text to the Commerce Web, the Commerce Token is required
*       security:
*           - bearerAuth: []
*       requestBody:
*         content:
*           multipart/form-data:
*             schema:
*               type: object
*               properties:
*                 image:
*                   type: string
*                   format: binary
*                   description: The image file to upload
*                 text:
*                   type: array
*                   description: The text to upload
*             required:
*               - image
*       responses:
*           '200':
*               description: Return the Web info with the new image uploaded
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Web/WebCreated"
*           '403':
*               description: Error uploading image
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/WebUpload"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.patch("/",authCommerce,uploadMiddleware.single("image"),uploadImage)

// RUTA PATCH /web/restore
/**
*   @openapi
*   /web/restore:
*   patch:
*       tags:
*       - Web
*       summary: Restore a Web
*       description: Restore a Commerce Web, the Commerce Token is required
*       security:
*           - bearerAuth: []
*       responses:
*           '200':
*               description: Return the Web info restored
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Web/WebRestored"
*           '403':
*               description: Error restoring Web
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/WebRestored"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.patch("/restore",authCommerce,restoreWeb)

module.exports = router