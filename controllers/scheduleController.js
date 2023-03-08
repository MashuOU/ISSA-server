const { Schedule, Teacher, History, Class } = require('../models');

class ScheduleController {
  static async schedules(req, res, next) {
    const { idTeacher } = req.user;
    // console.log(req.user.idTeacher);
    try {
      const data = await Schedule.findAll({
        where: { ClassId: idTeacher },
        include: {
          model: Schedule,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err)
    }
  }
  static async addSchedule(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const { ClassId, day, LessonId } = req.body
      const data = await Schedule.create({ ClassId, day, LessonId })
      const history = await History.create({ description: `Schedule has been created`, createdBy: teacherClass.Teacher.name })
      res.status(201).json({ data, history })
    } catch (error) {
      next(error)
    }
  }
  static async deleteSchedule(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const id = req.params.id
      const check = await Schedule.findByPk(id)
      if (!check) throw { name: `notFound` }
      const data = await Schedule.destroy({ where: { id } })
      const history = await History.create({ description: `Schedule day : ${check.day} Lesson Id : ${check.LessonId} has been deleted`, createdBy: teacherClass.Teacher.name })
      res.status(200).json({ message: "Success delete", history })
    } catch (error) {
      next(error)
    }
  }
  static async editSchedule(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const { ClassId, day, LessonId } = req.body
      const id = req.params.id
      const check = await Schedule.findByPk(id)
      if (!check) throw { name: `notFound` }

      const data = await Schedule.update({ ClassId, day, LessonId }, { where: { id } })
      const history = await History.create({ description: `Schedule day : ${check.day} Lesson Id : ${check.LessonId} has been edited`, createdBy: teacherClass.Teacher.name })

      res.status(200).json({ status: `success`, history })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ScheduleController;
