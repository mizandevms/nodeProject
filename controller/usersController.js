const bcrypt = require("bcrypt")
const res = require("express/lib/response")

const User = require("../models/People")

function getUsers(req, res, next) {
	res.render("users", {
		title: "Users - Chat application ",
	})
}

// add users

async function addUsers(req, res, next) {
	let newUser
	const hashedPassword = await bcrypt.hash(res.body.password, 10)

	if (req.files && req.files.length > 0) {
		newUser = new User({
			...req.body,
			avatar: req.files[0].filename,
			password: hashedPassword,
		})
	} else {
		newUser = new User({
			...req.body,
			password: hashedPassword,
		})
	}

	// save the user
	try {
		const result = await newUser.save()
		res.status(200).json({
			message: "user added successfully",
		})
	} catch (err) {
		res.status(500).json({
			errors: {
				common: {
					msg: "unknown error occured",
				},
			},
		})
	}
}

module.exports = {
	getUsers,
	addUsers,
}
