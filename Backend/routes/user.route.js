const userController = require('../controllers/user.controlller')
const express = require('express')
const checkAuth = require('../middlewares/checkAuth.middleware')
const route = express.Router()

route.get('/', checkAuth, userController.getUserById)
route.put("/:id", userController.updatedUser)
route.post("/", userController.createUser)
route.patch("/name/:id", userController.updatedUserName)
route.patch("/email/:id", userController.updatedUserEmail)
route.patch("/status/:id", userController.changeStatus)
route.delete("/:id", userController.deleteUser)

route.post("/register", userController.userRegister)

module.exports = route

