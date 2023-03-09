const { Schedule, Lesson } = require('../models');

class ScheduleController {
  static async schedules(req, res, next) {
    const { idTeacher } = req.user;
    // console.log(req.user.idTeacher);
    try {
      const data = await Schedule.findAll({
        where: { ClassId: idTeacher },
        include: {
          model: Lesson,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async scheduleById(req, res, next) {
    const { id } = req.params;
    // console.log(req.user.idTeacher);
    try {
      const data = await Schedule.findOne({
        where: { id: id },
        include: {
          model: Lesson,
        },
      });
      if (!data) {
        throw { name: 'notFound' };
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ScheduleController;
