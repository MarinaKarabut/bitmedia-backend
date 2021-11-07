const express = require("express")

const { users: ctrl } = require("../controllers")

const router = express.Router()

router.get("/users", ctrl.getAllUsers)

router.get("/stats/:id", ctrl.getById)

module.exports = router
