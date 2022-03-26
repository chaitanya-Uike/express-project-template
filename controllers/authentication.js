const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const registerUser = async (req, res) => {
    const user = await User.create({ ...req.body })
    await user.saveHash()
    const token = user.getJWT()
    res.cookie('JWT', token)
    res.status(StatusCodes.CREATED).json({ "msg": "user created successfully" })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ "msg": "please provide both email and password" })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "msg": "Invalid credentials" })
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "msg": "Invalid credentials" })
    }

    const token = user.getJWT()
    res.cookie('JWT', token)
    return res.status(StatusCodes.OK).json({ "msg": "Authentication successful" })
}

module.exports = { registerUser, loginUser }