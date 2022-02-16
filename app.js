const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")

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
app.set("vue emgine", "ejs")
// set static folder
app.use(express.static(path.join(__dirname, "public")))

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRECT))

// routing setup
// error handle

// port listern
app.listen(process.env.PORT, () => {
	console.log(`app is listening to port ${process.env.PORT}`)
})
