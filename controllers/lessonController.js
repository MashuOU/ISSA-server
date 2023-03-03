const { Lesson } = require('../models')
const Slug = require('slug')

class LessonController {
    static async allLessons(req, res, next) {
        try {
            const data = await Lesson.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async lessonById(req, res, next) {
        try {
            const id = req.params.id
            const data = await Lesson.findByPk(id)
            if (!data) {
                throw { name: "notFound" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async addLesson(req, res, next) {
        try {
            const { name } = req.body
            let slug = Slug(name)
            const data = await Lesson.create({ name, slug })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async deleteLesson(req, res, next) {
        try {
            const id = req.params.id
            const data = await Lesson.destroy({ where: { id } })
            res.status(200).json({ message: "Success delete" })
        } catch (error) {
            next(error)
        }
    }
    static async editLesson(req, res, next) {
        try {
            const { name } = req.body
            let slug = Slug(name)
            const id = req.params.id
            const data = await Lesson.update({ name, slug }, { where: { id } })

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LessonController