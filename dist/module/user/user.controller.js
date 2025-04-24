"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield user_service_1.userService.createUser(payload);
        res.json({
            status: true,
            message: 'User is created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getUser();
        res.send({
            status: true,
            message: 'Users are retrieved successfully!',
            result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong!',
            error,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userService.getSingleUser(userId);
        res.send({
            status: true,
            message: 'User is retrieved successfully!',
            result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const body = req.body;
        const result = yield user_service_1.userService.updateUser(email, body);
        if (!result) {
            res.status(404).json({
                status: false,
                message: 'User not found!',
            });
        }
        res.send({
            status: true,
            message: 'User updated successfully!',
            result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
};
