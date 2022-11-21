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
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = process.env.DB_URI || "";
            this.client = new mongodb_1.MongoClient(uri);
        });
    }
    close() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.close());
        });
    }
    insertManyVacancies(vacancies) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.db("web").collection("vagas"));
            yield (collection === null || collection === void 0 ? void 0 : collection.insertMany(vacancies));
        });
    }
    getVacancies() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.db("web").collection("vagas"));
            return yield (collection === null || collection === void 0 ? void 0 : collection.find().toArray());
        });
    }
    getTodayVacancies() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const collection = (_a = this.client) === null || _a === void 0 ? void 0 : _a.db("web").collection("vagas");
            const vacancies = yield (collection === null || collection === void 0 ? void 0 : collection.find({ date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }).toArray());
            return vacancies;
        });
    }
    getVacanciesOneHour() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.db("web").collection("vagas"));
            const vacancies = yield (collection === null || collection === void 0 ? void 0 : collection.find({ date: { $gte: new Date(new Date().setHours(new Date().getHours() - 1)) } }).toArray());
            return vacancies;
        });
    }
}
exports.default = Database;
