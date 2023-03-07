const request = require("supertest");
const app = require("../app");
const { Teacher, Student, Class, sequelize } = require("../models");
const { createToken } = require("../helpers/index");
const { queryInterface } = sequelize;

let validToken, validToken2, invalidToken;
const userTest1 = {
    "NIP": "1800011221",
    "name": "Julianto",
    "password": "qwerty",
    "imgUrl": "https://smpn2kelapadua.sch.id/media_library/employees/43099a3a74f681f1c08fa268c258f94f.JPG"
}


const userTest2 = {
    "NIP": "1800011222",
    "name": "Sumiyati",
    "password": "12345",
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9QlB991ONcK5xybf6AGCg-JDna5VUqibyfRgngW9-PDh4vnRTGItX_0XdE1YbExBIgFc&usqp=CAU"
}

beforeAll((done) => {
    Teacher.create(userTest1)
        .then((registeredUser) => {
            validToken = createToken({
                NIP: registeredUser.NIP
            });
            invalidToken =
                "123456789eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
            return Teacher.create(userTest2);
        })
        .then((registeredUser2) => {
            validToken2 = createToken({
                NIP: registeredUser2.NIP
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
                        "imgUrl": "http://s.sim.siap-online.com//upload/siswa/203270392571CDD3961D.190204115415.jpg",
                        "ClassId": 1,
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                    {
                        "NIM": "0203202302",
                        "name": "Amirah Zahra",
                        "age": 8,
                        "gender": "Female",
                        "birthDate": "2002-07-13",
                        "feedback": "Sering terlambat dan tidak menyelesaikan pekerjaan rumah, diharapkan untuk berangkat lebih awal dari biasanya",
                        "imgUrl": "http://s.sim.siap-online.com//upload/siswa/2032703927C644342614.190204115307.jpg",
                        "ClassId": 1,
                        "createdAt": new Date(),
                        "updatedAt": new Date()
                    },
                    {
                        "NIM": "0203202303",
                        "name": "Beni Habibie",
                        "age": 9,
                        "gender": "Male",
                        "birthDate": "2002-7-13",
                        "feedback": "Sering terlambat dan tidak menyelesaikan pekerjaan rumah, diharapkan untuk berangkat lebih awal dari biasanya",
                        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKsd4MuCmtvUgVWfpakuSsassRMc4e7xqLQRB3IZzMWrRUQOvRv8gVVtsQdgMLXmu_pJw&usqp=CAU",
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
            done(err);
        });
});

// afterAll(done => {
//     // Teacher.destroy({ truncate: true, cascade: true, restartIdentity: true })
//     //     .then(_ => {
//     //         return Student.destroy({ truncate: true, cascade: true, restartIdentity: true })
//     //     })
//     //     // .then(_ => {
//     //     //     return MyHero.destroy({ truncate: true, cascade: true, restartIdentity: true })
//     //     // })
//     //     .then(_ => {
//     //         done();
//     //     })
//     //     .catch(err => {
//     //         done(err);
//     //     });
// });

describe("GET /students", () => {
    test("200 success get student", (done) => {
        request(app)
            .get("/students")
            .set("access_token", validToken)
            .then((response) => {
                const { body, status } = response;

                expect(status).toBe(200);
                // expect(Array.isArray(body)).toBeTruthy();
                // expect(body.length).toBeGreaterThan(0);
                done();
            })
            .catch((err) => {
                done(err);
                console.log('====================================');
                console.log(err);
                console.log('====================================');
            });
    });

    //   test("401 get heroes with invalid token", (done) => {
    //     request(app)
    //       .get("/heroes")
    //       .set("access_token", invalidToken)
    //       .then((response) => {
    //         const { body, status } = response;

    //         expect(status).toBe(401);
    //         expect(body).toHaveProperty("message", "Invalid token");
    //         done();
    //       })
    //       .catch((err) => {
    //         done(err);
    //       });
    //   });

    //   test("401 get heroes without token", (done) => {
    //     request(app)
    //       .get("/heroes")
    //       .then((response) => {
    //         const { body, status } = response;

    //         expect(status).toBe(401);
    //         expect(body).toHaveProperty("message", "Invalid token");
    //         done();
    //       })
    //       .catch((err) => {
    //         done(err);
    //       });
    //   });
});

// describe("POST /myheroes/:heroId", () => {
//   test("201 success POST myheroes", (done) => {
//     request(app)
//       .post(`/myheroes/1`)
//       .set("access_token", validToken)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(201);
//         expect(body).toHaveProperty("id", expect.any(Number));
//         expect(body).toHaveProperty("HeroId", 1);
//         expect(body).toHaveProperty("UserId", expect.any(Number));
//         expect(body).toHaveProperty("status", "Unplayed");
//         idMyHero = body.id;
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("401 POST selected hero with invalid token", (done) => {
//     request(app)
//       .post(`/myheroes/1`)
//       .set("access_token", invalidToken)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Invalid token");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("401 POST selected hero without token", (done) => {
//     request(app)
//       .post(`/myheroes/1`)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Invalid token");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("404 POST selected hero not found", (done) => {
//     request(app)
//       .post(`/myheroes/99`)
//       .set("access_token", validToken)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(404);
//         expect(body).toHaveProperty("message", "Hero not found");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });

// describe("GET /myheroes", () => {
//   test("200 success get all selected heroes", (done) => {
//     request(app)
//       .get("/myheroes")
//       .set("access_token", validToken)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(200);
//         expect(Array.isArray(body)).toBeTruthy();
//         expect(body.length).toBeGreaterThan(0);
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("401 get selected heroes with invalid token", (done) => {
//     request(app)
//       .get("/myheroes")
//       .set("access_token", invalidToken)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Invalid token");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("401 get selected heroes without token", (done) => {
//     request(app)
//       .get("/myheroes")
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Invalid token");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });

// describe("UPDATE /myheroes/:id", () => {
//   test("200 success update selected hero", (done) => {
//     request(app)
//       .patch(`/myheroes/${idMyHero}`)
//       .set("access_token", validToken)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(200);
//         expect(body).toHaveProperty("message", "Hero has been played");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });


//   test("403 update selected hero with unauthorized user", (done) => {
//     request(app)
//       .patch(`/myheroes/${idMyHero}`)
//       .set("access_token", validToken2)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(403);
//         expect(body).toHaveProperty("message", "You are not authorized");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("401 update selected hero with invalid token", (done) => {
//     request(app)
//       .patch(`/myheroes/${idMyHero}`)
//       .set("access_token", invalidToken)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Invalid token");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("401 update selected hero without token", (done) => {
//     request(app)
//       .patch(`/myheroes/${idMyHero}`)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Invalid token");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("404 update selected hero not found", (done) => {
//     request(app)
//       .patch(`/myheroes/99`)
//       .set("access_token", validToken)
//       .then((response) => {
//         const { body, status } = response;

//         expect(status).toBe(404);
//         expect(body).toHaveProperty("message", "Hero not found");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });
