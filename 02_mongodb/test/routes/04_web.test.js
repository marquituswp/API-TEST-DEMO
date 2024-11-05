// Testing de la ruta de web
const request = require("supertest")
const path = require('path');
const globalTestConfig = require("../globalTestConfig")
const app = require("../../app")

describe("Web", () =>{

    let webId = ""

    // Test para crear una web
    it("Should create a web", async ()=>{
        const response = await request(app)
            .post("/web")
            .set('Authorization', `Bearer ${globalTestConfig.token_commerce}`) // Se necesita autorización de comercio (la web pertenece a un comercio)
            .send({"city":"cityTest","activity":"activityTest","title":"titleTest","summary":"summaryTest","texts":["text1","text2"],"images":["image1","image2"],"reviews":{"scoring":4.5,"points":100,"review":"reviewTest"}})
            .expect(200)
        expect(response.body.title).toEqual("titleTest")
        expect(response.body.cifCommerce).toEqual(globalTestConfig.commerce_cif) // Comprobamos que la web pertenece al comercio
        webId = response.body._id // Guardamos el id de la web para futuras pruebas
    })

    // Test para obtener todas las webs
    it("Should get all webs", async () =>{
        await request(app)
            .get("/web")
            .expect(200)
    })

    // Test para obtener los usuarios interesados en la web
    it("Should get the users interested in the commerce web", async () =>{
        const response = await request(app)
            .get("/web/users")
            .set('Authorization', `Bearer ${globalTestConfig.token_commerce}`) // Se necesita autorización de comercio (la web pertenece a un comercio)
            .expect(200)
        expect(response.body.emails[0]).toEqual("testemail@gmail.com") // Comprobamos que el usuario interesado es el que hemos creado
    })

    // Test para obtener una web por ID
    it("Should get a web by ID", async () =>{
        const response = await request(app)
            .get("/web/"+webId)
            .expect(200)
        expect(response.body.title).toEqual("titleTest")
    })

    // Test para actualizar una web por ID
    it("Should update a web by ID", async () =>{
        const response = await request(app)
            .put("/web/"+webId)
            .set('Authorization', `Bearer ${globalTestConfig.token_commerce}`) // Se necesita autorización de comercio (la web pertenece a un comercio)
            .send({"city":"cityTestUpdated","activity":"activityTestUpdated","title":"titleTestUpdated","summary":"summaryTestUpdated","texts":["text1","text2"],"images":["image1","image2"],"reviews":{"scoring":4.5,"points":100,"review":"reviewTest"}})
            .expect(200)
        expect(response.body.title).toEqual("titleTestUpdated")
    })

    // Test para subir una imagen a una web
    it("Should upload an image to a web", async () =>{
        await request(app)
            .patch("/web/"+webId)
            .set('Authorization', `Bearer ${globalTestConfig.token_commerce}`) // Se necesita autorización de comercio (la web pertenece a un comercio)
            .attach('image', path.resolve(__dirname, '../../img.jpg')) // Ruta a la imagen de prueba
            .expect(200)
    })

    // Test para obtener las webs de un usuario por ciudad
    it("Should get the the Webs in the User city", async () =>{
        await request(app)
            .get("/users/web/cityTest/activityTest")
            .expect(200)
    })

    // Test para obtener las webs de un usuario por ciudad ordenadas
    it("Should get the the Webs in the User city ordered", async () =>{
        await request(app)
            .get("/users/web/cityTest/activityTest?order=true")
            .expect(200)
    })

    // Test para hacer una review a una web
    it("Should review a web", async () =>{
        const response = await request(app)
            .put("/users/reviewWeb/"+webId)
            .set('Authorization', `Bearer ${globalTestConfig.token_own}`) // Se necesita autorización de usuario (el usuario ha de estar interesado en la web)
            .send({"scoring":4.5,"points":100,"review":"reviewTest"})
            .expect(200)
        expect(response.body.web.reviews[0].scoring).toEqual(4.5)
    })

    // Test para borrar una web por ID lógicamente
    it("Should delete a web by ID logically", async () =>{
        await request(app)
            .delete("/web/"+webId)
            .set('Authorization', `Bearer ${globalTestConfig.token_commerce}`) // Se necesita autorización de comercio (la web pertenece a un comercio)
            .query({"hard":false})
            .expect(200)
    })

    // Test para restaurar una web por ID
    it("Should restore a web by ID", async () =>{
        await request(app)
            .patch("/web/restore/"+webId)
            .set('Authorization', `Bearer ${globalTestConfig.token_commerce}`) // Se necesita autorización de comercio (la web pertenece a un comercio)
            .expect(200)
    })

    // Test para borrar una web por ID físicamente
    it("Should delete a web by ID phisicaly", async () =>{
        await request(app)
            .delete("/web/"+webId)
            .set('Authorization', `Bearer ${globalTestConfig.token_commerce}`) // Se necesita autorización de comercio (la web pertenece a un comercio)
            .query({"hard":true})
            .expect(200)
    })

    // Test para borrar un comercio por CIF lógicamente
    it("Should delete a commerce by CIF logically", async () =>{
        await request(app)
            .delete(`/comercio/${globalTestConfig.commerce_cif}`)
            .set('Authorization', `Bearer ${globalTestConfig.token_admin}`) // Se necesita autorización (no hace falta ser admin)
            .query({"hard":false})
            .expect(200)
    })

    // Test para restaurar un comercio por CIF
    it("Should restore a commerce by CIF", async () =>{
        await request(app)
            .patch(`/comercio/restore/${globalTestConfig.commerce_cif}`)
            .set('Authorization', `Bearer ${globalTestConfig.token_admin}`) // Se necesita autorización (no hace falta ser admin)
            .expect(200)
    })

    // Test para borrar un comercio por CIF
    it("Should delete a commerce by CIF phisicaly", async () =>{
    await request(app)
        .delete(`/comercio/${globalTestConfig.commerce_cif}`)
        .set('Authorization', `Bearer ${globalTestConfig.token_admin}`) // Se necesita autorización (no hace falta ser admin)
        .query({"hard":true})
        .expect(200)
    })

    // Test para borrar un usuario por ID
    it("Should delete a user by an ID phisicaly", async () =>{
        await request(app)
            .delete(`/users/${globalTestConfig.user_id}`)
            .set('Authorization', `Bearer ${globalTestConfig.token_own}`) // Se necesita autorización y ser el mismo usuario (no se puede borrar a otro)
            .expect(200)
    })

})