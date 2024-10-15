// Utilidad para manejar errores HTTP
const handleHttpError = (res, message, code = 403) => {

    res.status(code).send(message)
}

module.exports = { handleHttpError }