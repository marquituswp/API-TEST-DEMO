// App principal de la API
const express = require("express")
const morganBody = require("morgan-body")
const path = require('path');
const cors = require("cors")

require('dotenv').config();
// Importamos el stream del logger, para documentar en swagger y la configuración de la base de datos
const loggerStream = require("./utils/handleLogger.js")
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./docs/swagger.js")
const app = express()
const dbConnect = require("./config/mongo.js")

// Configuración de morgan para documentar las peticiones en el logger
morganBody(app, {

    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack

    skip: function (req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)

        return res.statusCode < 400

    },

    stream: loggerStream

})

// Middleware para el manejo de errores
app.use(cors())
app.use(express.json())
// Middleware para la documentación de la API en Swagger
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/swagger", swaggerUi.serve,swaggerUi.setup(swaggerDocs))
// Uso las rutas de routes/index.js, que a su vez usa las rutas de los archivos en routes/
app.use("/", require("./routes"))
// Middleware para servir archivos estáticos
app.use(express.static("storage"))

dbConnect()


module.exports = app