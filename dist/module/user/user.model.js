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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: false
    },
    role: {
        type: String,
        enum: ['student', 'tutor'],
        required: true,
    },
    userStatus: {
        type: String,
        default: 'active',
    },
    bio: {
        type: String,
    },
    photo: {
        type: String,
    },
    phone: {
        type: String,
    },
    salary: {
        type: String,
    },
    tuition: {
        type: String,
        default: "Available"
    },
    PreferredTeach: {
        type: String,
    },
    tuitionStyle: {
        type: String,
        default: "online"
    },
    location: {
        type: String,
    },
    experience: {
        type: String,
    },
    subject: {
        type: String,
    },
    availableDays: {
        type: String,
    },
    class: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        // hashing password and save into DB
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
