const { Score, Student, Lesson } = require('../models')

class ScoreController {
    static async addScore(req, res, next) {
        try {
            const { StudentId, LessonId, value } = req.body

            const checkStudent = await Student.findByPk(StudentId)
            const checkLesson = await Lesson.findByPk(LessonId)
            if (!checkStudent || !checkLesson) throw { name: `notFound` }

            const data = await Score.create({ StudentId, LessonId, value })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async editScore(req, res, next) {
        try {
            const { StudentId, LessonId, value } = req.body

            const checkStudent = await Student.findByPk(StudentId)
            const checkLesson = await Lesson.findByPk(LessonId)
            if (!checkStudent || !checkLesson) throw { name: `notFound` }

            const data = await Score.update({value}, { where: { StudentId, LessonId } })
            res.status(201).json({msg:`successfuly updated`})
        } catch (error) {
            next(error)
        }
    }
}
module.exports = ScoreController