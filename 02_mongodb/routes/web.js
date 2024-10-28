// Rutas de web
const express= require("express")
const {validatorCreateWeb,validatorDeleteWeb,validatorGetWeb,validatorUpdateWeb} = require("../validators/web")
const router = express.Router()
const uploadMiddleware = require("../utils/handleUpload")
// Importamos el middleware de autenticación de comercio, solo los comercios pueden acceder a sus webs
const {authCommerce} = require("../middlewares/session")
const {getWebs,getWebById,createWeb,updateWeb,deleteWeb,uploadImage,getUsersWeb} = require("../controllers/web")

// RUTA GET /web
/**
*   @openapi
*   /web:
*   get:
*       tags:
*       - Web
*       summary: Get all webs
*       responses:
*           '200':
*               description: Return all Webs
*           '304':
*               description: Error getting Webs
*/
router.get("/",getWebs)

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
*           '304':
*               description: Error getting Usersç
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
*           '304':
*               description: Error getting Web
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
*                       $ref: "#/components/schemas/web"
*       responses:
*           '200':
*               description: Return the new Web created
*           '304':
*               description: Error creating Web
*/
router.post("/",authCommerce,validatorCreateWeb,createWeb)

// RUTA PUT /web/{id}
/**
*   @openapi
*   /web/{id}:
*   put:
*       tags:
*       - Web
*       summary: Update Web by ID
*       description: Update a Commerce Web, the Commerce TOKEN of the Web is required
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: id
*             schema: 
*                type: string
*             required: true
*             description: The ID of the Web
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/web"
*       responses:
*           '200':
*               description: Return the new Web info
*           '304':
*               description: Error updating Web
*/
router.put("/:id",authCommerce,validatorUpdateWeb,updateWeb)

// RUTA DELETE /web/{id}
/**
*   @openapi
*   /web/{id}:
*   delete:
*       tags:
*       - Web
*       summary: Delete Web by ID
*       description: Delte a Commerce Web by its ID, the Commerce Token is required
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: id
*             schema: 
*                type: string
*             required: true
*             description: The ID of the Web
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
*               description: Error deleting Web
*/
router.delete("/:id",authCommerce,validatorDeleteWeb,deleteWeb)

// RUTA PATCH /web/{id}
/**
*   @openapi
*   /web/{id}:
*   patch:
*       tags:
*       - Web
*       summary: Upload an image to the Web
*       description: Upload an image to the Commerce Web, the Commerce Token is required
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: id
*             schema: 
*                type: string
*             required: true
*             description: The ID of the Web
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
*             required:
*               - image
*       responses:
*           '200':
*               description: Return the Web info with the new image uploaded
*           '304':
*               description: Error uploading image
*/
router.patch("/:id",authCommerce,uploadMiddleware.single("image"),uploadImage)

module.exports = router