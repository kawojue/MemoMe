"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtVerify_1 = __importDefault(require("../../middlewares/jwtVerify"));
const settings_1 = require("../../controllers/settings");
const auth_1 = require("../../controllers/auth");
const passwordRoute = express_1.default.Router();
passwordRoute.post('/reset', auth_1.resetpswd);
passwordRoute.post('/verify', auth_1.verifyOTP);
passwordRoute.post('/edit', jwtVerify_1.default, settings_1.editPswd);
exports.default = passwordRoute;
