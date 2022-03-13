const jwt = require('jsonwebtoken')

const authorizationMiddleware = async function (req, res, next) {
    const token = req.cookies.JWT
    if (!token) {
        return res.redirect('/auth/login')
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = { ...payload }
        next()
    } catch (error) {
        return res.redirect('/auth/login')
    }
}

module.exports = authorizationMiddleware