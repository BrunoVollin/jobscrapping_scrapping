import fs from "fs";

export function writeAJson({
    data,
    path,
    fileName
}: {
    data: any;
    path: string;
    fileName: string;
}) {
    try {
        console.log({ data, path });
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        fs.writeFileSync(`${path}/${fileName}`, JSON.stringify(data, null, 2));
    } catch (error) {
        throw error;
    }
}