import * as fs from "fs";
import * as path from "path";


export class FileService {

    arquivoExists(filePath: string): boolean {
        if (fs.existsSync(filePath)) {
            return true;
        }
        return false;
    }

    criaArquivo(filePath: string, content: string = ""): boolean {
        try {
            fs.writeFileSync(filePath, content, "utf8");
            return true;
        } catch (error) {
            return false;
        }
    }

}   