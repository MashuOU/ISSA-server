const { Score } = require('../models')

class ScoreController {
    static async addScore(req, res, next) {
        try {
            const { StudentId, LessonId, value } = req.body
            console.log('====================================');
            console.log(StudentId, LessonId, value);
            console.log('====================================');

            const data = await Score.create({ StudentId, LessonId, value })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = ScoreController