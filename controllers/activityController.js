const { Activity } = require('../models')

class ActivityController {
    static async allActivities(req, res, next) {
        try {
            const data = await Activity.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async activityById(req, res, next) {
        try {
            const id = req.params.id
            const data = await Activity.findByPk(id)
            if (!data) {
                throw { name: "notFound" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async addActivity(req, res, next) {
        try {
            const { name, date } = req.body
            console.log(date);
            const data = await Activity.create({ name, date })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async deleteActivity(req, res, next) {
        try {
            const id = req.params.id
            const check = await Activity.findByPk(id)
            if (!check) throw { name: `notFound` }
            const data = await Activity.destroy({ where: { id } })
            res.status(200).json({ message: "Success delete" })
        } catch (error) {
            next(error)
        }
    }
    static async editActivity(req, res, next) {
        try {
            const { name, date } = req.body
            const id = req.params.id
            const check = await Activity.findByPk(id)
            if (!check) throw { name: `notFound` }

            const data = await Activity.update({ name, date }, { where: { id } })

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ActivityController