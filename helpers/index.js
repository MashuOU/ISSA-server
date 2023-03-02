const b = require("bcrypt")
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET


const generatetoken = (payload) => {
    return jwt.sign(payload, secret)
}

const decodeToken = (token) => {
    return jwt.verify(token, secret)
}
const hashPassword = (password) => {
    return b.hashSync(password, 12)
}

const checkPass = (password, hash) => {
    return b.compareSync(password, hash)
}


module.exports = { hashPassword, checkPass, decodeToken, generatetoken }

console.log(secret);