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
const scrapping_1 = __importDefault(require("../scrapping"));
const writeAJson_1 = require("./../utils/writeAJson");
const technologies = [
    { nameTechnology: "React Native", type: "mobile" },
    { nameTechnology: "React", type: "web" },
    { nameTechnology: "Node", type: "backend" },
    { nameTechnology: "Flutter", type: "mobile" },
    { nameTechnology: "Angular", type: "web" },
    { nameTechnology: "Vue", type: "web" },
    { nameTechnology: "Laravel", type: "backend" },
    { nameTechnology: "Django", type: "backend" },
    { nameTechnology: "Spring", type: "backend" },
    { nameTechnology: "Express", type: "backend" },
    { nameTechnology: "Ruby on Rails", type: "backend" },
    { nameTechnology: "Ionic", type: "mobile" },
    { nameTechnology: "ReactJS", type: "web" },
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const scr = new scrapping_1.default();
        yield scr.connect();
        for (const technology of technologies) {
            console.log(`Searching vacancies for ${technology.nameTechnology}...`);
            yield scr.searchVacancies(technology);
        }
        (0, writeAJson_1.writeAJson)({
            fileName: "vacancies.json",
            path: "./src/data",
            data: scr.getVacancies
        });
    });
}
main();
