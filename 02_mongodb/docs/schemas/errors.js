module.exports = {
    type: 'object',
    // Esquema de respuesta de error al registrar un usuario
    auth:{
        type: 'object',
        properties:{
            message:{
                type:"string",
                example:"ERROR_REGISTER_USER"
            }
        }
    },
    // Esquema de respuesta de error al loguear un usuario
    login:{
        type: 'object',
        properties:{
            message:{
                type:"string",
                example:"ERROR_LOGIN_USER"
            }
        }
    },
    // Esquema de respuesta de error al obtener un usuario
    RolUser:{
        400:{
            type:"object",
            properties:{
                message:{
                    type:"string",
                    example:"USER_NOT_ALLOWED"
                }
            }
        },
        401:{
            type:"object",
            properties:{
                message:{
                    type:"string",
                    example:"ERROR_CHECKING_ROLE"
                }
            }
        }
        
    },
    // Esquema de respuesta de error al verificar token
    NotToken:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"NOT_AUTH_TOKEN"
            }
        }
    },
    // Esquema de respuesta de error al obtener usuarios
    User:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_GET_USERS"
            }
        }
    },
    // Esquema de respuesta de error al obtener webs de un usuario de una ciudad o interes
    UserWeb:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_GETTING_COMMERCES_CITY"
            }
        }
    },
    // Esquema de respuesta de error al obtener actualizar un usuario
    UserUpdate:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_UPDATING_USER"
            }
        }
    },
    // Esquema de respuesta de error al actualizar el rol de un usuario
    UserUpdateRole:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_UPDATING_ROLE"
            }
        }
    },
    // Esquema de respuesta de error al eliminar un usuario
    UserDelete:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_DELETING_USER"
            }
        }
    },
    // Esquema de respuesta de error al hacer review de una web
    UserReviewWeb:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_REVIEWING_WEB"
            }
        }
    },
    // Esquema de respuesta de error al obtener webs
    WebCreated:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_GET_WEB"
            }
        }
    },
    // Esquema de respuesta de error al obtener usuarios interesados en una web
    WebUsers:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_GETTING_USERSWEB"
            }
        }
    },
    // Esquema de respuesta de error al crear web
    CreateWeb:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_CREATE_WEB"
            }
        }
    },
    // Esquema de respuesta de error al actualizar web
    UpdateWeb:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_UPDATE_WEB"
            }
        }
    },
    // Esquema de respuesta de error al eliminar web
    WebDelete:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_DELETE_WEB"
            }
        }
    },
    // Esquema de respuesta de error al subir imagen
    WebUpload:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_UPLOAD_IMAGE"
            }
        }
    },
    // Esquema de respuesta de error al restaurar web
    WebRestored:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_RESTORE_WEB"
            }
        }
    },
    // Esquema de respuesta de error al obtener comercios
    Commerce:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_GET_COMERCIO"
            }
        }
    },
    // Esquema de respuesta de error al crear comercio
    CommerceCreated:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_CREATE_COMERCIO"
            }
        }
    },
    // Esquema de respuesta de error al actualizar comercio
    CommerceUpdate:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_UPDATE_COMERCIO"
            }
        }
    },
    // Esquema de respuesta de error al eliminar comercio
    CommerceDelete:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_DELETE_COMERCIO"
            }
        }
    },
    // Esquema de respuesta de error al restaurar comercio
    CommerceRestored:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_RESTORE_COMERCIO"
            }
        }
    },
    // Esquema de respuesta de error al enviar email
    Mail:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_SEND_EMAIL"
            }
        }
    },
}