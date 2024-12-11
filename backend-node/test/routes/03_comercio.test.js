// Testing de la ruta de comercios
const request = require("supertest")
const globalTestConfig = require("../globalTestConfig")
const app = require("../../app")

describe("Comercios", () =>{

    // Test para crear un comercio
    it("Should create a Commerce", async () =>{
        const response = await request(app)
            .post("/comercio")
            .set('Authorization', `Bearer ${globalTestConfig.token_admin}`) // Se necesita autorización (no hace falta ser admin)
            .send({"name": "TestCommerce1", "cif":"00000000A", "email":"testemailcomercio@gmail.com", "phone": "456789123", "page_id":"00001"})
            .set("Accept", "application/json")
            .expect(200)
        expect(response.body.commerce.name).toEqual("TestCommerce1")
        // Guardamos el token del comercio y el cif para futuras pruebas
        globalTestConfig.token_commerce = response.body.token
        globalTestConfig.commerce_cif = response.body.commerce.cif
    })

    // Test para obtener todos los comercios
    it("Should get all Commerces", async () =>{
        await request(app)
            .get("/comercio")
            .set('Authorization', `Bearer ${globalTestConfig.token_admin}`) // Se necesita autorización (no hace falta ser admin)
            .expect(200)
    })

    // Test para obtener un comercio por CIF
    it("Should get Commerce by CIF", async () =>{
        await request(app)
            .get(`/comercio/${globalTestConfig.commerce_cif}`) // Se necesita el cif del comercio
            .set('Authorization', `Bearer ${globalTestConfig.token_admin}`) // Se necesita autorización (no hace falta ser admin)
            .expect(200)
    })

    // Test para actualizar un comercio por CIF
    it("Should update a commerce by CIF", async () =>{
        const response = await request(app)
            .put(`/comercio/${globalTestConfig.commerce_cif}`) // Se necesita el cif del comercio
            .set('Authorization', `Bearer ${globalTestConfig.token_admin}`) // Se necesita autorización (no hace falta ser admin)
            .send({"name": "TestCommerce1Updated", "cif":"00000000A", "email":"testemailcomercio@gmail.com", "phone": "456789123", "page_id":"00001"})
            .expect(200)
        expect(response.body.name).toEqual("TestCommerce1Updated")
    })

   
})