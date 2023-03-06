const { Class } = require('../models')
class Controller {
    static async fetchAllClass(req, res, next) {
        try {
            const data = await Class.findAll()

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async fetchClassById(req, res, next) {
        const { classId } = req.params
        try {
            const data = await Class.findOne({ where: { id: classId } })
            if (!data) throw { name: `notFound` }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller
