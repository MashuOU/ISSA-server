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
      console.log(err);
    }
  }
}

module.exports = ScheduleController;
