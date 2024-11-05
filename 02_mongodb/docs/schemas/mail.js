module.exports = {
    type : 'object',
    required:["subject","text","to"],
    properties:{
        subject:{
            type:"string",
            example:"subject"
        },
        text:{
            type:"string",
            example:"text"
        },
        to:{
            type:"string",
            example:"to"
        }
    },
    MailSended:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"Mail sended"
            }
        }
    },
}
