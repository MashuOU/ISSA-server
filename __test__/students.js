const request = require("supertest");
const app = require("../app");
const { User, Hero, MyHero, sequelize } = require("../models");
const { generatetoken } = require("../helpers");
const { queryInterface } = sequelize;

let validToken, v1
const userTest1 = {
    NIM: "0203202301",
    password: "usertest1",
};

const userTest2 = {
    NIM: "1800011221",
    password: "usertest2",
};

beforeAll((done) => {
    User.create(userTest1)
        .then((registeredUser) => {
            validToken = generatetoken({
                id: registeredUser.id,
                NIM: registeredUser.NIM,
            });
            invalidToken =
                "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
            return User.create(userTest2);
        })
        .then((registeredUser2) => {
            validToken2 = generatetoken({
                id: registeredUser2.id,
                NIM: registeredUser2.NIM,
            });
            return queryInterface.bulkInsert('Students',
                [
                    {
                        "NIM": "0203202301",
                        "name": "Abdi Azhari",
                        "age": 9,
                        "gender": "Male",
                        "birthDate": "2002-10-03",
                        "feedback": "Sering terlambat dan tidak menyelesaikan pekerjaan rumah, diharapkan untuk berangkat lebih awal dari biasanya",
                        "TeacherId": "1"
                    },
                    {
                        "NIM": "0203202302",
                        "name": "Amirah Zahra",
                        "age": 8,
                        "gender": "Female",
                        "birthDate": "2002-07-13",
                        "feedback": "Sering terlambat dan tidak menyelesaikan pekerjaan rumah, diharapkan untuk berangkat lebih awal dari biasanya",
                        "TeacherId": "1"
                    },
                    {
                        "NIM": "0203202303",
                        "name": "Beni Habibie",
                        "age": 9,
                        "gender": "Male",
                        "birthDate": "2002-7-13",
                        "feedback": "Sering terlambat dan tidak menyelesaikan pekerjaan rumah, diharapkan untuk berangkat lebih awal dari biasanya",
                        "TeacherId": "1"
                    },
                ],
                {}
            );
        })
        .then((_) => {
            return queryInterface.bulkInsert('Admins',
                [
                    {
                        "NIP": "1800011221",
                        "name": "Julianto",
                        "password": "qwerty"
                    }
                ],
                {}
            );
        })
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        });
});

afterAll(done => {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true })
        .then(_ => {
            return Student.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            return Admin.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
});

describe("GET /Student", () => {
    test("200 success get student", (done) => {
        request(app)
            .get("/student")
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

    test("401 get student with invalid token", (done) => {
        request(app)
            .get("/student")
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 get student without token", (done) => {
        request(app)
            .get("/student")
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("GET /Student/:id", () => {
    test("200 success get student", (done) => {
        request(app)
            .get("/student/1")
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

    test("401 get student with invalid token", (done) => {
        request(app)
            .get("/student/1")
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 get student without token", (done) => {
        request(app)
            .get("/student/1")
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("POST /student", () => {
    test("201 success POST student", (done) => {
        request(app)
            .post(`/student`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("NIM", expect.any(String));
                expect(body).toHaveProperty("age", expect.any(String));
                expect(body).toHaveProperty("gender", expect.any(String));
                expect(body).toHaveProperty("birthDate", expect.any(Date));
                expect(body).toHaveProperty("feedback", expect.any(String));
                expect(body).toHaveProperty("TeacherId", expect.any(Number));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 POST selected hero with invalid token", (done) => {
        request(app)
            .post(`/student`)
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 POST selected hero without token", (done) => {
        request(app)
            .post(`/student`)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

});


describe("UPDATE /student/:id", () => {
    test("200 success update selected hero", (done) => {
        request(app)
            .patch(`/student/1`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Hero has been played");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });


    test("403 update selected hero with unauthorized user", (done) => {
        request(app)
            .patch(`/student/1`)
            .set("access_token", validToken2)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "You are not authorized");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 update selected hero with invalid token", (done) => {
        request(app)
            .patch(`/student/1`)
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 update selected hero without token", (done) => {
        request(app)
            .patch(`/student/1`)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("404 update selected hero not found", (done) => {
        request(app)
            .patch(`/student/99`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Hero not found");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});
