const request = require("supertest");
const app = require("../app");
const { Teacher, Student, User, sequelize } = require("../models");
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
            return queryInterface.bulkInsert('Users',
                [

                    {
                        "NIM": "0203202305",
                        "password": hashPassword(`qwerty`),
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                    {
                        "NIM": "02032023010",
                        "password": hashPassword(`qwerty`),
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                ],
                {}
            );
        })
        .then((_) => {
            return queryInterface.bulkInsert('Classes',
                [

                    {
                        "id": 1,
                        "name": "1A",
                        "TeacherId": 1,
                        "SPP": 200000,
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                ],
                {}
            );
        })
        .then((_) => {
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
                        "ClassId": 1,
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
            return Student.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            return User.destroy({ truncate: true, cascade: true, restartIdentity: true })
        })
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
});

describe("post /users", () => {
    test("200 payment success", (done) => {
        request(app)
            .post("/users/generate-midtrans/1")
            .set("access_token", validToken2)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(201);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("404 payment failed", (done) => {
        request(app)
            .post("/users/generate-midtrans/100")
            .set("access_token", validToken2)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(404);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});