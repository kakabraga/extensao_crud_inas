import * as fs from "fs";
import * as path from "path";
import { IFileService } from "../interfaces/IFileService";


export class FileService implements IFileService {

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
            console.error(`Erro ao criar o arquivo ${filePath}:`, error);
            return false;
        }
    }


    obterExtensao(filePath: string): string {
        return path.extname(filePath).toLowerCase();
    }

    lerArquivo(filePath: string): string {
        return fs.readFileSync(filePath, "utf8");
    }

    deletarArquivo(filePath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    return console.error("not Deleted file:", filePath);
                }

                console.log("Deleted file:", filePath);
                resolve();
            });
        });
    }

} 