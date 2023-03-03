const { Student } = require('../models')


class StudentController {
    static async allStudents(req, res, next) {
        try {
            const data = await Student.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async studentById(req, res, next) {
        try {
            const id = req.params.id
            const data = await Student.findByPk(id)
            if (!data) {
                throw { name: "notFound" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async addStudent(req, res, next) {
        try {
            const { NIM, name, age, gender, birthDate, feedback, TeacherId } = req.body
            const data = await Student.create({ NIM, name, age, gender, birthDate, feedback, TeacherId })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async deleteStudent(req, res, next) {
        try {
            const id = req.params.id
            const student = await Student.findByPk(id)
            if (!student) {
                throw { name: "notFound" }
            }
            const data = await Student.destroy({ where: { id } })
            res.status(200).json({ message: `Student with NIM ${student.NIM} success delete from list` })
        } catch (error) {
            next(error)
        }
    }
    static async editStudent(req, res, next) {
        try {
            const { NIM, name, age, gender, birthDate, feedback, TeacherId } = req.body
            const id = req.params.id
            const data = await Student.update({
                NIM, name, age, gender, birthDate, feedback, TeacherId
            },
                { where: { id } })

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = StudentController