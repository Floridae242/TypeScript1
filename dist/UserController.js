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
exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./User"));
function validText(value) {
    return typeof value === 'string' && value.trim().length > 0;
}
function validEmail(value) {
    return validText(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function validId(id) {
    return typeof id === 'string' && mongoose_1.default.isValidObjectId(id);
}
function sendError(res, error) {
    if (error instanceof mongoose_1.default.Error.ValidationError) {
        res.status(400).json({ message: 'Invalid user data' });
    }
    else if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
        res.status(409).json({ message: 'Email already exists' });
    }
    else {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { name, email, password } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        if (!validText(name) || !validEmail(email) || !validText(password)) {
            res.status(400).json({ message: 'Name, email and password are required' });
            return;
        }
        try {
            const user = yield User_1.default.create({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password: yield bcryptjs_1.default.hash(password, 10),
            });
            res.status(201).json({ id: user.id, name: user.name, email: user.email });
        }
        catch (error) {
            sendError(res, error);
        }
    });
}
function getUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield User_1.default.find().select('name email'));
        }
        catch (error) {
            sendError(res, error);
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (!validId(id)) {
            res.status(400).json({ message: 'Invalid user ID' });
            return;
        }
        try {
            const user = yield User_1.default.findById(id).select('name email');
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            sendError(res, error);
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const id = req.params.id;
        if (!validId(id)) {
            res.status(400).json({ message: 'Invalid user ID' });
            return;
        }
        const { name, email, password } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        if ((name !== undefined && !validText(name)) ||
            (email !== undefined && !validEmail(email)) ||
            (password !== undefined && !validText(password))) {
            res.status(400).json({ message: 'Invalid user data' });
            return;
        }
        if (name === undefined && email === undefined && password === undefined) {
            res.status(400).json({ message: 'No user data to update' });
            return;
        }
        try {
            const changes = {};
            if (name !== undefined)
                changes.name = name.trim();
            if (email !== undefined)
                changes.email = email.trim().toLowerCase();
            if (password !== undefined)
                changes.password = yield bcryptjs_1.default.hash(password, 10);
            const user = yield User_1.default.findByIdAndUpdate(id, changes, {
                returnDocument: 'after',
                runValidators: true,
            }).select('name email');
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            sendError(res, error);
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (!validId(id)) {
            res.status(400).json({ message: 'Invalid user ID' });
            return;
        }
        try {
            const user = yield User_1.default.findByIdAndDelete(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json({ message: 'User deleted' });
        }
        catch (error) {
            sendError(res, error);
        }
    });
}
