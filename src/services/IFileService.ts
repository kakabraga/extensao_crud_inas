// src/services/IFileService.ts
export interface IFileService {
    verificaArquivoExistente(filePath: string): boolean;
    criaArquivo(filePath: string, content: string): boolean;
    lerArquivo(filePath: string): string;
    obterExtensao(filePath: string): string;
    deletarArquivo(filePath: string): boolean;
}
