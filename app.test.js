import request from 'supertest'
import app from './app.js'


test("should respond with a 200 status code", async () => {
    return request(app).post("/object").send({
        username: "username",
    }).
    expect(200)

});
//describe("POST /object", () => {
//describe("given a key value pair", () => {

//test("should respond with a 200 status code", async () => {
//const response = await request(app).post("/object").send({
//username: "username",
//})
//expect(response.statusCode).toBe(200)
//done();
//})
//        //test("should specify json in the content type header", async () => {
//const response = await request(app).post("/object").send({
//username: "username",
//})
//expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
//})
//test("response has data", async () => {
//const response = await request(app).post("/object").send({
//username: "username",
//})
//expect(response.body).toBeDefined()
//})
//})

//describe("when the username and password is missing", () => {
//test("should respond with a status code of 400", async () => {
//const bodyData = [{
//username: "username"
//},
//{
//password: "password"
//},
//{}
//]
//for (const body of bodyData) {
//const response = await request(app).post("/users").send(body)
//expect(response.statusCode).toBe(400)
//}
//})
//})

//})