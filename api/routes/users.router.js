const express = require("express");
const usersController = require("../controllers/users.controller");
const auth = require("../auth");
const router = express.Router();

router.get("/", auth.user, usersController.getUser); // получение данных пользователя @param { header: token } @return { status, object }
router.get("/:id(\\d+)", usersController.getUserId);
router.get("/all", auth.user, usersController.getUsers); //получение списка пользователей @param { header: token } @return { status, object }
router.get("/:id/addons", usersController.getUserAddons);
router.post("/create", usersController.createUser); //регистрация @param  { post: name, email, password } @return { status, message }
router.post("/login", usersController.loginUser); //авторизация @param  { post: email, password } @return { status, object }
router.put("/update", auth.user, usersController.updateUser); //обновление данных пользователя @param  {header: token, put: first_name,last_name,gender,birthday,address,avatar } @return { object }
router.delete("/:id", usersController.deleteUser); //удаление пользователя @param  { header:token, delete: user_id } @return { status, message }
router.put("/activate", usersController.activateUser); //активация пользователя @param  { header:token, put: user_id } @return { status, message }
router.put("/change-password", auth.user, usersController.changePassword); //смена пароля пользователя @param  { header:token, put: user_id, password } @return { status, message }

module.exports = router;
