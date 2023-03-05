const request = require("supertest");
const app = require("../app");
const { Teacher, Student, Class, sequelize } = require("../models");
const { createToken } = require("../helpers/index");
const { queryInterface } = sequelize;

let validToken, validToken2, invalidToken;
const userTest1 = {
    NIM: "1230315603",
    password: "usertest1",
};

const userTest2 = {
    NIP: "4512048965120",
    password: "usertest2",
};

beforeAll((done) => {
    Teacher.create(userTest1)
        .then((registeredUser) => {
            validToken = createToken({
                id: registeredUser.id,
                NIM: registeredUser.NIM,
            });
            invalidToken =
                "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
            return User.create(userTest2);
        })
        .then((registeredUser2) => {
            validToken2 = createToken({
                id: registeredUser2.id,
                NIP: registeredUser2.NIP,
            });
            return queryInterface.bulkInsert('Classes',
                [
                    {
                        "name": "1A",
                        "TeacherId": 1,
                        "SPP": 200000
                    },
                    {
                        "name": "2B",
                        "TeacherId": 2,
                        "SPP": 250000
                    }
                ],
                {}
            );
        })
        .then(() => {
            return queryInterface.bulkInsert('Students',
                [
                    {
                        "NIM": "0203202301",
                        "name": "Abdi Azhari",
                        "age": 9,
                        "gender": "Male",
                        "birthDate": "2002-10-03",
                        "feedback": "Sering terlambat dan tidak menyelesaikan pekerjaan rumah, diharapkan untuk berangkat lebih awal dari biasanya",
                        "imgUrl": "http://s.sim.siap-online.com//upload/siswa/203270392571CDD3961D.190204115415.jpg",
                        "ClassId": 1
                    },
                    {
                        "NIM": "0203202302",
                        "name": "Amirah Zahra",
                        "age": 8,
                        "gender": "Female",
                        "birthDate": "2002-07-13",
                        "feedback": "Sering terlambat dan tidak menyelesaikan pekerjaan rumah, diharapkan untuk berangkat lebih awal dari biasanya",
                        "imgUrl": "http://s.sim.siap-online.com//upload/siswa/2032703927C644342614.190204115307.jpg",
                        "ClassId": 1
                    },
                    {
                        "NIM": "0203202303",
                        "name": "Beni Habibie",
                        "age": 9,
                        "gender": "Male",
                        "birthDate": "2002-7-13",
                        "feedback": "Sering terlambat dan tidak menyelesaikan pekerjaan rumah, diharapkan untuk berangkat lebih awal dari biasanya",
                        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKsd4MuCmtvUgVWfpakuSsassRMc4e7xqLQRB3IZzMWrRUQOvRv8gVVtsQdgMLXmu_pJw&usqp=CAU",
                        "ClassId": 1
                    },
                ],
                {}
            );
        })
        .then(() => {
            done()
        })
        .catch((err) => {
            done(err);
        });
});

afterAll(done => {
    Teacher.destroy({ truncate: true, cascade: true, restartIdentity: true })
        .then(_ => {
            return Student.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            return Class.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
});

describe("GET /students", () => {
    test("200 success get students", (done) => {
        request(app)
            .get("/students")
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

    test("401 get students with invalid token", (done) => {
        request(app)
            .get("/students")
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("msg", "Invalid Token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 get students without token", (done) => {
        request(app)
            .get("/students")
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("msg", "Invalid Token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("GET /students/:id", () => {
    test("200 success get specific students", (done) => {
        request(app)
            .get("/students/1")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("NIM", expect.any(String));
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty("age", expect.any(Number));
                expect(body).toHaveProperty("gender", expect.any(String));
                expect(body).toHaveProperty("birthDate", expect.any(String));
                expect(body).toHaveProperty("ClassId", expect.any(Number));
                expect(body).toHaveProperty("imgUrl", expect.any(String));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 get students with invalid token", (done) => {
        request(app)
            .get("/students/1")
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("msg", "Invalid Token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 get students without token", (done) => {
        request(app)
            .get("/students/1")
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("msg", "Invalid Token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("POST /students/", () => {
    test("201 success POST students", (done) => {
        request(app)
            .post(`/students`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("NIM", expect.any(String));
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty("age", expect.any(Number));
                expect(body).toHaveProperty("gender", expect.any(String));
                expect(body).toHaveProperty("birthDate", expect.any(String));
                expect(body).toHaveProperty("ClassId", expect.any(Number));
                expect(body).toHaveProperty("imgUrl", expect.any(String));
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 POST student with invalid token", (done) => {
        request(app)
            .post(`/students`)
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("msg", "Invalid Token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 POST student without token", (done) => {
        request(app)
            .post(`/students`)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("msg", "Invalid Token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});



describe("UPDATE /students/:id", () => {
    test("200 success update selected student", (done) => {
        request(app)
            .put(`/students/1`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                expect(body).toHaveProperty("status", "updated");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 update selected student with invalid token", (done) => {
        request(app)
            .put(`/students/1`)
            .set("access_token", invalidToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("msg", "Invalid Token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("401 update selected hero without token", (done) => {
        request(app)
            .put(`/students/1`)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(401);
                expect(body).toHaveProperty("msg", "Invalid Token");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test("404 update selected student not found", (done) => {
        request(app)
            .put(`/students/99`)
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                expect(body).toHaveProperty("msg", "Data Not Found");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});
