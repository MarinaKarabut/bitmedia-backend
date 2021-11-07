const express = require("express")
const logger = require("morgan")
const cors = require("cors")

const usersRouter = require("./routes/users")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/v1", usersRouter)

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : 500
  res.status(err.status).json({
    status: err.status === 500 ? "fail" : "error",
    code: err.status,
    message: err.message,
  })
})

module.exports = app
