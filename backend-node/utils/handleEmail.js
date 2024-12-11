const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { handleHttpError } = require('../utils/handleError')

const OAuth2 = google.auth.OAuth2;

// Función para crear el transportador de correos electrónicos
const createTransporter = async () => {

    const oauth2Client = new OAuth2(

        process.env.CLIENT_ID,

        process.env.CLIENT_SECRET,

        process.env.REDIRECT_URI

    );

    oauth2Client.setCredentials({

        refresh_token: process.env.REFRESH_TOKEN

    });

    const accessToken = await new Promise((resolve, reject) => {

        oauth2Client.getAccessToken((err, token) => {

            if (err) {

                reject("Failed to create access token.");

            }

            resolve(token);

        });

    });

    const transporter = nodemailer.createTransport({

        service: "gmail",

        auth: {

            type: "OAuth2",

            user: process.env.EMAIL,

            accessToken,

            clientId: process.env.CLIENT_ID,

            clientSecret: process.env.CLIENT_SECRET,

            refreshToken: process.env.REFRESH_TOKEN

        }

    });

    return transporter;

};

// Función para enviar correos electrónicos
const sendEmail = async (emailOptions) => {

    try {
        
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);

    } catch (e) {
        
        handleHttpError(res, 'ERROR_SEND_EMAIL',403)

    }

};

module.exports = { sendEmail }