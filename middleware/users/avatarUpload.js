function avatarUpload(req, res, next) {
	const upload = uploader("avatar", ["image/jpeg", "image/png", "image/jpg"], 1000000, "Only .jepg, .png, or .jpg  format allowed")
}

module.exports = avatarUpload
