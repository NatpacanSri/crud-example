const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors");
const PORT = 8080;


const dbUrl = "mongodb+srv://johnny:test1234@cluster0.e9jvqih.mongodb.net/school?retryWrites=true&w=majority"
require('dotenv').config();
app.use(cors());
mongoose.Promise = global.Promise

mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connect to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB:", err))

const studentRouter = require('./routes/students')
const teacherRouter = require('./routes/teachers')

app.use('/student',studentRouter)
app.use('/teacher',teacherRouter)


app.listen(PORT, () =>{
    console.log(`Server start on port ${PORT}`)
})

