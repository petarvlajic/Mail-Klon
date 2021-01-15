const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const cors = require('cors')


//Route files
const test = require('./routes/test')
const messages = require('./routes/messages')



// Load env vars
dotenv.config({ path: './config/config.env' })

//connect to database
connectDB()



const app = express()

//Body parser
app.use(express.json())
app.use(cors())

//Mount routers
app.use('/test', test)
app.use('/messages', messages)


const PORT = process.env.PORT || 5000

const servert = app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}.red`)
  //Close server & exit process
  servert.close(() => process.exit(1))
})