import * as fs from "fs";
import * as path from "path";


export class FileService {

    verificaArquivoExistente(filePath: string): boolean {
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


    obterExtensao(filePath: string): string {
        return path.extname(filePath).toLowerCase();
    }

    lerArquivo(filePath: string): string {
        return fs.readFileSync(filePath, "utf8");
    }

}   