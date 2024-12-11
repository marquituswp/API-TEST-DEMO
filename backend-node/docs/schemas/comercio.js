module.exports = {
    type: 'object',
    // Esquema para crear un comercio
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
    },
    // Esquema de respuesta de creación de comercio
    CommerceCreated:{
        type:"object",
        properties:{
            Token:{
                type:"string",
                example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjQzNjIzNzIzNzIzNzIzNzIzNzIzNyIsImlhdCI6MTYzNjIwNjQwMiwiZXhwIjoxNjM2MjA2NDAyfQ.7"
            },
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
    // Esquema de respuesta de eliminación de comercio
    CommerceDeleted:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"COMMERCE_DELETED_PHISICALY"
            }
        }
    },
    // Esquema de respuesta de restauración de comercio
    CommerceRestored:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"COMMERCE_RESTORED"
            },
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
}