const { Score, Student, Lesson, Class, History, Teacher } = require('../models')

class ScoreController {
    static async addScore(req, res, next) {
        try {
            const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

            const { StudentId, LessonId, value } = req.body

            const checkStudent = await Student.findByPk(StudentId)
            const checkLesson = await Lesson.findByPk(LessonId)
            if (!checkStudent || !checkLesson) throw { name: `notFound` }

            const data = await Score.create({ StudentId, LessonId, value })

            const history = await History.create({ description: `Score student with name ${checkStudent.name} and lesson ${checkLesson.name} has been created`, createdBy: teacherClass.Teacher.name })
            res.status(201).json({ data, history })
        } catch (error) {
            next(error)
        }
    }

    static async editScore(req, res, next) {
        try {
            const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

            const { StudentId, LessonId, value } = req.body

            const checkStudent = await Student.findByPk(StudentId)
            const checkLesson = await Lesson.findByPk(LessonId)
            if (!checkStudent || !checkLesson) throw { name: `notFound` }

            const data = await Score.update({ value }, { where: { StudentId, LessonId } })
            const history = await History.create({ description: `Score student with name ${checkStudent.name} and lesson ${checkLesson.name} has been edited`, createdBy: teacherClass.Teacher.name })
            res.status(201).json({ msg: `successfuly updated`, history })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = ScoreController