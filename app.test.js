import request from 'supertest'
import app from './app.js'



describe("POST /object", () => {
    describe("given a key value pair", () => {

        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/object").send({
                username: "username",
            })
            expect(response.statusCode).toBe(200)
            done();
        })
        //test("should specify json in the content type header", async () => {
        const response = await request(app).post("/object").send({
            username: "username",
        })
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has data", async () => {
        const response = await request(app).post("/object").send({
            username: "username",
        })
        expect(response.body).toBeDefined()
    })
})