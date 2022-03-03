const path = require("path")
const multer = require("multer")
const createError = require("http-errors")

function uploader(subFolder_path, allowed_file_type, max_file_size, err_msg) {
	// upload folder
	const uploadFolder = `${__dirname}/../public/uploads/${subFolder_path}`

	// ddefine the storage

	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, uploadFolder)
		},
		filename: function (req, file, cb) {
			const FileExtn = path.extname(file.originalname)
			const filename = file.originalname.replace(FileExtn, "").toLowerCase().split(" ").join("-") + "-" + Date.now()

			cb(null, filename + FileExtn)
		},
	})

	// finale upload object

	const upload = multer({
		storage: storage,
		limits: {
			fileSize: max_file_size,
		},
		fileFilter: (req, file, cb) => {
			if (allowed_file_type.includes(file.mimetype)) {
				cb(null, true)
			} else {
				cb(createError(err_msg))
			}
		},
	})

	return upload
}

module.exports = uploader
