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
    // Esquema para crear un comentario en una web
    reviewWeb:{
        type:"object",
        required:["scoring","points","review"],
        properties:{
            scoring:{
                type:"number",
                example: 3
            },
            review:{
                type:"string",
                example: "Buena experiencia"
            },
        }
    },
    UserUpdate:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"User updated"
            },
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
    },
    UserUpdateRole:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"Role changed"
            }
        }
    },
    UserDelete:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"User deleted succesfully"
            }
        }
    },
    UserReviewWeb:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"Web Reviewed"
            },
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
                example:[]
            },
            reviews:{
                type:"object",
                properties:{
                    scoring:{
                        type:"number",
                        example: 3
                    },
                    points:{
                        type:"number",
                        example: 1
                    },
                    review:{
                        type:"string",
                        example: "Buena experiencia"
                    },
                }
            },
        }
    }
}