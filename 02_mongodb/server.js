// Servidor de la aplicación
const app = require('./app');
const port = process.env.PORT || 3000

// Iniciamos el servidor (lo separamos del app para poder testearlo con supertest sin lanzar el servidor)
app.listen(port, () => {  

    console.log("Servidor escuchando en el puerto " + port) 

})