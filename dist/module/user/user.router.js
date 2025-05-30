"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post('/create-user', user_controller_1.userController.createUser);
userRouter.get('/get/:userId', user_controller_1.userController.getSingleUser);
userRouter.put('/:email', user_controller_1.userController.updateUser);
userRouter.get('/', user_controller_1.userController.getAllUser);
exports.default = userRouter;
