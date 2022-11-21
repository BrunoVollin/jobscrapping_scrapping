import Scrapping from "../scrapping";
import { writeAJson } from './../utils/writeAJson';

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
]


async function main() {
    const scr = new Scrapping();
    await scr.connect();

    for (const technology of technologies) {
        console.log(`Searching vacancies for ${technology.nameTechnology}...`);
        await scr.searchVacancies(technology);
    }

    writeAJson({
        fileName: "vacancies.json",
        path: "./src/data",
        data: scr.getVacancies
    });
}

main();