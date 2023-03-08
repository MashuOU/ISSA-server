const request = require("supertest");
const app = require("../app");
const { Teacher, Student, User, sequelize, Chat } = require("../models");
const { createToken, hashPassword } = require("../helpers/index");
const { queryInterface } = sequelize;

let validToken, validToken2, invalidToken;
const userTest1 = {
    "NIP": "1800011221",
    "name": "Julianto",
    "password": "qwerty",
    "imgUrl": "https://smpn2kelapadua.sch.id/media_library/employees/43099a3a74f681f1c08fa268c258f94f.JPG"
}


const userTest2 = {
    "NIM": "0203202301",
    "password": `qwerty`,
}

beforeAll((done) => {
    Teacher.create(userTest1)
        .then((registeredUser) => {
            validToken = createToken(
                registeredUser.NIP
            );
            invalidToken =
                "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
            return User.create(userTest2);
        })
        .then((registeredUser2) => {
            validToken2 = createToken(
                registeredUser2.NIM
            );
            return queryInterface.bulkInsert('Chats',
                [

                    {
                        "fromUserId": 2,
                        "toUserId": 1,
                        "roomId": 2,
                        "message": "Selamat pagi",
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                    {
                        "fromUserId": 2,
                        "toUserId": 1,
                        "roomId": 2,
                        "message": "Selamat pagi",
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                    {
                        "fromUserId": 1,
                        "toUserId": 2,
                        "roomId": 2,
                        "message": "Selamat pagi",
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                    {
                        "fromUserId": 1,
                        "toUserId": 3,
                        "roomId": 1,
                        "message": "Selamat pagi",
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },

                ],
                {}
            );
        })

        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done(err);
        });
});

afterAll(done => {
    Teacher.destroy({ truncate: true, cascade: true, restartIdentity: true })
        .then(_ => {
            return Chat.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
});

describe("get /chat", () => {
    test("200 all chat", (done) => {
        request(app)
            .get("/chats/1/2")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                expect(Array.isArray(body)).toBeTruthy();
                expect(body.length).toBeGreaterThan(0);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("500 all chat", (done) => {
        request(app)
            .get("/chats/1/a")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(500);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    ;
    test("404 all chat", (done) => {
        request(app)
            .get("/chats/")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("200 all chat", (done) => {
        request(app)
            .get("/chats/1")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("404 all chat", (done) => {
        request(app)
            .get("/chats/100")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("404 all chat", (done) => {
        let body = {
            "from": "1",
            "to": "3",
            "message": "Selamat pagi",
        }
        request(app)
            .post("/chats")
            .send(body)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(201);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("500 all chat", (done) => {
        request(app)
            .post("/chats")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(500);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});