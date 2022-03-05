const {check, validationResult} = require("express-validator")
const createError = require("http-errors")
const {unlink} = require("fs")
const {path} = require("path")

const User = require("../../models/People")

const addUserValidator = [
	check("name").isLength({min: 6}).withMessage("Name field is required").isAlpha("en-US", {ignore: " -"}).withMessage("Name must contain nothing else alphabets").trim(),
	check("email")
		.isEmail()
		.withMessage("Invalaid Email Address")
		.trim()
		.custom(async (value) => {
			try {
				const user = await User.findOne({email: value})
				if (user) {
					throw createError("User Already Exists!")
				}
			} catch (err) {
				throw createError(err.message)
			}
		}),
	check("mobile")
		.isMobilePhone("bn-BD", {
			strictMode: true,
		})
		.withMessage("Mobile number must be bangladesh")

		.custom(async (value) => {
			try {
				const user = await User.findOne({mobile: value})
				if (user) {
					throw createError("Mobile Already Exists!")
				}
			} catch (err) {
				throw createError(err.message)
			}
		}),

	check("password").isStrongPassword().withMessage("password must be strong "),
]

const addUservalidationHandler = function (req, res, next) {
	const errors = validationResult(req)
	const mappederrors = errors.mapped()
	if (Object.keys(mappederrors).length == 0) {
		next()
	} else {
		// remove file uploded
		if (req.files.length > 0) {
			const {} = req.files[0]
			unlink(path.join(__dirname, `/../public/uploads/avatar/${filename}`), (err) => {
				if (err) {
					console.log(err)
				}
			})

			// response the  errors
			res.status(500).json({
				errors: mappederrors,
			})
		}
	}
}

module.exports = {
	addUserValidator,
	addUservalidationHandler,
}
