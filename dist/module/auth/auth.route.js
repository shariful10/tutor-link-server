"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const userValidation_1 = require("../user/userValidation");
const auth_validation_1 = require("./auth.validation");
const authRoute = (0, express_1.Router)();
authRoute.post('/register', (0, validateRequest_1.default)(userValidation_1.UserValidation.userValidationSchema), auth_controller_1.AuthController.register);
authRoute.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.login);
exports.default = authRoute;
