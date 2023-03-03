const { checkPass, generatetoken } = require('../helpers')
const { User } = require('../models')


class UserController {
    static async login(req, res, next) {
        try {
            const { NIM, password } = req.body
            const data = await User.findOne({
                where: NIM
            })
            if (!data) {
                throw { name: "loginError" }
            } else {
                const isValid = checkPass(password, data.password)
                if (!isValid) {
                    throw { name: "loginError" }
                } else {
                    const access_token = generatetoken(data.NIM)
                    res.status(200).json({ access_token })
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController