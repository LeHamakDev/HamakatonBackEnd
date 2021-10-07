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
const weekRoute = require("./routes/week")
const themeRoute = require("./routes/theme")
const teamRoute = require("./routes/team")
const projectRoute = require("./routes/project")
const adminRoute = require("./admin/admin")
app.use("/user", userRoute)
app.use("/week", weekRoute)
app.use("/theme", themeRoute)
app.use("/team", teamRoute)
app.use("/project", projectRoute)
app.use("/admin", adminRoute)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



