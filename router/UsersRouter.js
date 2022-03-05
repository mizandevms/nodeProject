const express = require("express")
const router = express.Router()

// internal imports
const {getUsers, addUsers} = require("../controller/usersController")
const avatarUpload = require("../middleware/users/avatarUpload")
const {addUserValidator, addUservalidationHandler} = require("../middleware/users/userValidator")

router.get("/", getUsers)

router.post("/", avatarUpload, addUserValidator, addUservalidationHandler, addUsers)

module.exports = router
