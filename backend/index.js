// import necessary libraries
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// import routes
import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import participantRoutes from './routes/participantRoutes.js'

// initialise environment variables
dotenv.config()

const app = express()

// configure the server with various options
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// configuring the routes
app.use('/', authRoutes)
app.use('/olympics/events', eventRoutes)
app.use('/olympics/participants', participantRoutes)

// set the PORT for the application to run on
const PORT = process.env.PORT || 5000

// start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})