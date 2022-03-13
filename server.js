// remove in production
require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)

const cookieParser = require('cookie-parser')

// to handle async errors
require('express-async-errors');

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

const connectDB = require('./config/connect')

// routes
const authRouter = require('./routes/authentication')

// middlewares
const authorizationMiddleware = require('./middlewares/authorization')
const errorHandler = require('./middlewares/errorHandler')

app.use('/auth', authRouter)

app.use(authorizationMiddleware)

app.get('/', (req, res) => {
    res.render('home', { "username": req.user.username })
})

// error handler middleware
app.use(errorHandler)


const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
