"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_path_1 = __importDefault(require("node:path"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const app = (0, express_1.default)();
const port = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', UserRoutes_1.default);
app.use(express_1.default.static(node_path_1.default.join(__dirname, '../src/public')));
app.get('/', (_req, res) => {
    res.send('Hello, World!');
});
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('Set MONGODB_URI in .env before starting the server');
    process.exitCode = 1;
}
else {
    mongoose_1.default.connect(mongoUri)
        .then(() => {
        const server = app.listen(port);
        server.on('listening', () => console.log(`Server is running on port ${port}`));
        server.on('error', (error) => {
            console.error(error.code === 'EADDRINUSE'
                ? `Port ${port} is already in use`
                : 'Could not start the server');
            process.exitCode = 1;
            void mongoose_1.default.disconnect();
        });
    })
        .catch(() => {
        console.error('Could not connect to MongoDB. Check MONGODB_URI and network access.');
        process.exitCode = 1;
    });
}
