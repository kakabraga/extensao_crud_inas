import { FileService } from "./FileService";

export class DtoService {
    constructor(private fileService: FileService) { }

    verificarArquivoExistente(caminho: string): boolean {
        const existe = this.fileService.arquivoExists(caminho);
        if (!existe) {
            return false;
        }
        return existe;
    }
}