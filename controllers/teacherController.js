const { checkPass, generatetoken } = require('../helpers')
const { Teacher } = require('../models')


class TeacherController {
    static async login(req, res, next) {
        try {
            const { NIP, password } = req.body
            const data = await Teacher.findOne({ where: { NIP } })
            if (!data) {
                throw { name: "loginError" }
            } else {
                const isValid = checkPass(password, data.password)
                if (!isValid) {
                    throw { name: "loginError" }
                } else {
                    const access_token = generatetoken(data.NIP)
                    res.status(200).json({ access_token })
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TeacherController