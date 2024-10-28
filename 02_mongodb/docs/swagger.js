const swaggerJsdoc = require("swagger-jsdoc")

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
                // Esquema para registrar un usuario
                user:{
                    type:"object",
                    required:["name","age","email","pasword","city","interests","allowOffers"],
                    properties:{
                        name:{
                            type:"string",
                            example:"Manolo"
                        },
                        age:{
                            type:"number",
                            example: 20
                        },
                        email:{
                            type:"string",
                            example:"emailexample@gmail.com"
                        },
                        password:{
                            type:"string",
                            example:"1234567890"
                        },
                        city:{
                            type:"string",
                            example:"Madrid"
                        },
                        interests:{
                            type:"array",
                            example: ["futbol","tenis"]
                        },
                        allowOffers:{
                            type:"boolean",
                            example: true
                        }
                    }
                },
                // Esquema para cambiar el rol de un usuario
                userRole:{
                    type:"object",
                    required: ["email","role"],
                    properties:{
                        email:{
                            type:"string",
                            example:"emailexample@gmail.com"
                        },
                        role:{
                            type:"array",
                            example:["user"]
                        }
                    }
                },
                // Esquema para loguear un usuario
                login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "emailexample@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "1234567890"
                        },
                    }
                },
                // Esquema para crear un comentario
                commerce:{
                    type:"object",
                    required:["name","cif","email","phone","page_id"],
                    properties:{
                        name:{
                            type:"string",
                            example:"Commerce1"
                        },
                        cif: {
                            type: "string",
                            example: "12345678A"
                        },
                        email: {
                            type: "string",
                            example: "emailcommerce@gmail.com"
                        },
                        phone: {
                            type: "string",
                            example: "456789123"
                        },
                        page_id: {
                            type: "string",
                            example: "40637"
                        },
                    }
                },
                // Esquema para crear una web
                web:{
                    type:"object",
                    required: ["city","activity","title","summary","texts","images","reviews","scoring","points","review"],
                    properties:{
                        city:{
                            type:"string",
                            example:"Madrid"
                        },
                        activity:{
                            type:"string",
                            example:"Running"
                        },
                        title:{
                            type:"string",
                            example:"Running in Madrid"
                        },
                        summary:{
                            type:"string",
                            example:"Running in Madrid is a great experience"
                        },
                        texts:{
                            type:"array",
                            example:["Madrid is a great city"]
                        },
                        images:{
                            type:"array",
                            example:["madrid.jpg"]
                        },
                        reviews:{
                            type: "object",
                            properties:{
                                scoring:{
                                    type:"number",
                                    example:4
                                },
                                points:{
                                    type:"number",
                                    example:4
                                },
                                review:{
                                    type:"string",
                                    example:"Great experience"
                                },
                            }
                        },
                    }
                }
            }
        }

    },
    apis:["./routes/*.js"]
}

module.exports = swaggerJsdoc(options)