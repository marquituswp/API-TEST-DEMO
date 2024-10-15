const express= require("express")
const {validatorCreateWeb,validatorDeleteWeb,validatorGetWeb,validatorUpdateWeb, validatorUploadImage} = require("../validators/web")
const router = express.Router()
const uploadMiddleware = require("../utils/handleStorage")
const {getWebById,createWeb,updateWeb,deleteWeb,uploadImage} = require("../controllers/web")

router.get("/:id",validatorGetWeb,getWebById)

router.post("/",validatorCreateWeb,createWeb)

router.put("/:id",validatorUpdateWeb,updateWeb)

router.delete("/:id",validatorDeleteWeb,deleteWeb)

router.patch("/:id",uploadMiddleware.single("image"),uploadImage)

module.exports = router