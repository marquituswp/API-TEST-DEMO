// Utilidad para manejar el logger de Slack
const { IncomingWebhook } = require("@slack/webhook")
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

// Creamos un stream para el logger
const loggerStream = {

    write: message => {
        webhook.send({
            text: message
        })
    }
}

module.exports = loggerStream