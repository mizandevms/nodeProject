const uploader = require("../../utilities/SingleUploader")

function avatarUpload(req, res, next) {
	const upload = uploader("avatar", ["image/jpeg", "image/png", "image/jpg"], 1000000, "Only .jepg, .png, or .jpg  format allowed")

	// call the middleware func
	upload.any()(req, res, (err) => {
		if (err) {
			res.status(500).json({
				errors: {
					avatar: {
						msg: err.message,
					},
				},
			})
		} else {
			next()
		}
	})
}

module.exports = avatarUpload
