const { Schedule, Lesson } = require('../models');

class ScheduleController {
  static async schedules(req, res, next) {
    try {
      const data = await Schedule.findAll({
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
