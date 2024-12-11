module.exports = {
    type: 'object',
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
    },
    // Esquema para loguear un usuario
    login: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: {
                type: "string",
                example: "user35@test.com"
            },
            password: {
                type: "string",
                example: "HolaMundo01"
            },
        }
    },
    // Esquema ejemplo respuesta auth
    authResponse: {
        type: "object",
        properties: {
            token: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIzNUB0ZXN0LmNvbSIsImlhdCI6MTYyNjIwNjQwMCwiZXhwIjoxNjI2MjA2NDAwfQ"

            },
            user: {
                type: "object",
                properties: {
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
                    },
                    role:{
                        type:"array",
                        example:["user"]
                    }
                }
            }
        }
    }
}