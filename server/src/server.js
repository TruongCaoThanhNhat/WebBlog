import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import configCors from './configs/configCors'
import { connectDB } from './configs/db'
import webRoutes from './routes/initWebRoutes'
import { errorHandler } from './middleware/errorHandler'
// import { cloudinaryConfig } from './configs/cloudinary'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
configCors(app)
    // cloudinaryConfig()

const PORT = process.env.PORT || 3000

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})

connectDB()
webRoutes(app)
    // app.all('*', (req, res, next) => {
    //     const err = new Error('404 NOT FOUND')
    //     err.statusCode = 404
    //     next(err)
    // })
app.use(errorHandler)
app.get('/', (req, res) => {
    res.send('Hello World')
})