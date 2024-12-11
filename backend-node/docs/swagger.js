const swaggerJsdoc = require("swagger-jsdoc")
const { Mail } = require("./schemas/errors")

// Swagger definition
const options = {
    definition:{
        openapi: "3.1.0",
        info:{
            title: "Express API with swagger",
            version: "0.1.0",
            description: "A CRUD API app made with Express"
        },
        servers:[
            {
                url: "http://localhost:3000",
            },
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme:"bearer"
                },
            },
            schemas:{
                Commerce: require("./schemas/comercio"),
                Web : require("./schemas/web"),
                Auth: require("./schemas/auth"),
                User: require("./schemas/user"),
                Errors : require("./schemas/errors"),
                Mail: require("./schemas/mail"),
            }
        }

    },
    apis:["./routes/*.js"]
}

module.exports = swaggerJsdoc(options)