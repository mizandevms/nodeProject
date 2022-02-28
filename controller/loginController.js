function getLogin(req, res, next) {
	res.render("index", {
		title: "Chat application login",
	})
}

module.exports = {
	getLogin,
}
