// Testing de la ruta de autenticación
const request = require("supertest")
const globalTestConfig = require("../globalTestConfig")
const app = require("../../app")

describe("Authorization", () =>{


    // Test para registrar un usuario
    it("Should register a user", async () =>{
        const response = await request(app)
            .post("/auth/register")
            .send({"name": "Test1", "age":20, "email":"testemail@gmail.com", "password": "testpassword1", "city":"cityTest","interests":["activityTest","activityTestUpdated"], "allowOffers": true})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.user.email).toEqual("testemail@gmail.com")
        expect(response.body.user.role[0]).toEqual("user")
        globalTestConfig.user_id = response.body.user._id
        globalTestConfig.token_own = response.body.token
    })

    // Test para loguear un usuario
    it("Should login an admin", async () =>{
        const response = await request(app)
            .post("/auth/login")
            .send({"email":"user35@test.com", "password": "HolaMundo01"})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.user.email).toEqual("user35@test.com")
        globalTestConfig.token_admin = response.body.token
    })

    // Test para loguear un usuario
    it("Should login a user", async () =>{
        const response = await request(app)
            .post("/auth/login")
            .send({"email":"testemail@gmail.com", "password": "testpassword1"})
            .set("Accept", "application/json")
            .expect(200)
        
        expect(response.body.user.email).toEqual("testemail@gmail.com")
        globalTestConfig.token_user = response.body.token
    })
})

module.exports = app