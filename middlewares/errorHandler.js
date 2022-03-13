const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
    let errorMsg = 'Some error occured !'

    if (err.name === 'ValidationError') {
        errorMsg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        res.statusCode = 400
    }

    if (err.code && err.code === 11000) {
        res.status(StatusCodes.CONFLICT)
        errorMsg = `User with given ${Object.keys(err.keyPattern)[0]} already exists`
    }

    return res.json({ "msg": errorMsg, "err": err })
}

module.exports = errorHandler