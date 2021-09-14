//DATABSE

const database = require('./database')
database.connect()

//EXPRESS

const bodyParser = require("body-parser")
const express = require('express')
const app = express()
const port = 1337
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

//ROUTES

const userRoute = require("./routes/user")
app.use("/user", userRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



