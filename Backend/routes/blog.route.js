const express = require('express')
const route = express.Router()
const blogController = require("../controllers/blog.controller")
const checkAuth = require('../middlewares/checkAuth.middleware')
const upload = require('../middlewares/multer.middleware')

route.post("/",checkAuth, upload.single('imageFile'),blogController.createBlog)

route.get("/", blogController.getBlog)
route.get("/userBlogs", checkAuth, blogController.getBlogByUserId)

// getting blog data by it's id
route.get("/:id", blogController.getBlogById)

// updateting blog with id
route.put("/:id", blogController.updateBlog)

// deleting blog with id
route.delete("/:id", blogController.deleteBlog)

module.exports = route
