module.exports = {
    type: 'object',
    // Esquema para crear una web
    required: ["city","activity","title","summary","texts","images"],
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
        }
    },
    // Esquema para actualizar una web
    Updateweb:{
        type:"object",
        required: ["city","activity","title","summary"],
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
        }
    },
    // Esquema de respuesta al crear una web
    WebCreated:{
        type:"object",
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
                example:[]
            },
            points:{
                type:"number",
                example:0
            },
            reviews:{
                type:"object",
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
        }
    },
    // Esquema de respuesta al obtener usuarios interesados en una web
    WebUsers:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"USERS_INTERESED"
            },
            emails:{
                type:"array",
                example:["emailexample@gmail.com"]
            }
        }
    },
    // Esquema de respuesta al borrar una web (físicamente)
    WebDelete:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"WEB_DELETED_PHISICALY"
            }
        }
    },
    // Esquema de respuesta al restaurar una web
    WebRestored:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"WEB_RESTORED"
            },
            web:{
                type:"object",
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
                        example:[]
                    },
                    points:{
                        type:"number",
                        example:0
                    },
                    reviews:{
                        type:"object",
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
                }
            }
        }
    },
}