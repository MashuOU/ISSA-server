const { Score, Student, Lesson, Class, Teacher, History } = require('../models')

class ScoreController {
    static async addScore(req, res, next) {
        try {
            const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

            const { StudentId, LessonId, value, AssignmentId, desc, status,  } = req.body

            const checkStudent = await Student.findByPk(StudentId)
            const checkLesson = await Lesson.findByPk(LessonId)
            if (!checkStudent || !checkLesson) throw { name: `notFound` }

            const data = await Score.create({ StudentId, LessonId, value, AssignmentId, desc, status,  })
            const history = await History.create({ description: `Score ${checkStudent.name} lesson ${checkLesson.name} has been created`, createdBy: teacherClass.Teacher.name })
            res.status(201).json({ data, history })
        } catch (error) {
            next(error)
        }
    }

    static async editScore(req, res, next) {
        try {
            const { StudentId, LessonId, value } = req.body
            console.log(StudentId, LessonId, value,'<>>>>>>>>>>>>>>>>>>>>>>>>>');
            const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

            const checkStudent = await Student.findByPk(StudentId)
            const checkLesson = await Lesson.findByPk(LessonId)
            if (!checkStudent || !checkLesson) throw { name: `notFound` }

            const data = await Score.update({ value }, { where: { StudentId, LessonId } })
            const history = await History.create({ description: `Score ${checkStudent.name} lesson ${checkLesson.name} has been edited`, createdBy: teacherClass.Teacher.name })
            res.status(200).json({ msg: `successfuly updated`, history })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = ScoreController