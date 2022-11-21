"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAJson = void 0;
const fs_1 = __importDefault(require("fs"));
function writeAJson({ data, path, fileName }) {
    try {
        console.log({ data, path });
        if (!fs_1.default.existsSync(path)) {
            fs_1.default.mkdirSync(path, { recursive: true });
        }
        fs_1.default.writeFileSync(`${path}/${fileName}`, JSON.stringify(data, null, 2));
    }
    catch (error) {
        throw error;
    }
}
exports.writeAJson = writeAJson;
