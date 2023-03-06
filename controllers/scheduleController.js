const { Schedule } = require('../models')

class Controller {
    static async addSchedule(req, res, next) {
        try {
            const { ClassId, LessonId, day } = req.body
            const data = await Schedule.create({ ClassId, LessonId, day })

            res.status(201).json(data)
        } catch (error) {
            next(error);
        }
    }
}
module.exports = Controller;
