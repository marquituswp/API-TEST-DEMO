// Utilidad para manejar contraseñas
const bcrypt = require("bcryptjs")

// Función para encriptar una contraseña
const encrypt = async (clearPassword) => {
    const hash = await bcrypt.hash(clearPassword,10)
    return hash
}

// Función para comparar una contraseña en texto plano con una encriptada
const compare = async (clearPassword, hashedPassword) =>{
    const result = await bcrypt.compare(clearPassword,hashedPassword)
    return result
}

module.exports={encrypt,compare}