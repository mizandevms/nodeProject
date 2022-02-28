// external imprts that means importing from packages

const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")

// internal imprts that means importing from modules

const {notFoundHandler, errorHandler} = require("./middleware/common/errorHandler")

const LoginRouter = require("./router/LoginRoutrer")

const app = express()
dotenv.config()

// db config

mongoose
	.connect(process.env.MONGO_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("db connceted succefully"))
	.catch((error) => console.log(error))

// request parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// set vue engine
app.set("view engine", "ejs")

// set static folder
app.use(express.static(path.join(__dirname, "public")))

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRECT))

// routing setup
app.use("/", LoginRouter)

// 404 not found error handle
app.use(notFoundHandler)

// common error handle
app.use(errorHandler)

// port listern
app.listen(process.env.PORT, () => {
	console.log(`app is listening to port ${process.env.PORT}`)
})
