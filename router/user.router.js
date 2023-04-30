const router = require('express').Router();
const mainController = require("../controller/main.controller")

router.get('/', mainController.getUser);

router.post('/', mainController.createUser);

router.put('/', mainController.updateUser);

router.delete('/', mainController.deleteUser);

module.exports = { router };