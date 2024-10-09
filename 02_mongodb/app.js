const express = require("express")

const cors = require("cors")

require('dotenv').config();

const app = express()
const dbConnect = require("./config/mongo.js")

app.use(cors())
app.use(express.json())

// Uso las rutas de routes/index.js, que a su vez usa las rutas de los archivos en routes/
app.use("/", require("./routes"))
app.use(express.static("storage"))

const port = process.env.PORT || 3000

app.listen(port, () => {  

    console.log("Servidor escuchando en el puerto " + port) 

})

dbConnect()