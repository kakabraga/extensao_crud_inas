import { IFileService } from "./IFileService";
import * as path from 'path';
import * as vscode from "vscode";

export class DtoService {
    private readonly workspaceRoot: string;
    private readonly dtoDirectory: string;

    constructor(private fileService: IFileService) {
        this.workspaceRoot = vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : '';
        this.dtoDirectory = path.join(this.workspaceRoot, "./dto");
    }

    criaDto(nome: string): boolean {
        const nomeFormatado = this.formataNomeDto(nome);
        const caminho = path.join(this.dtoDirectory, nomeFormatado);

        if (this.fileService.verificaArquivoExistente(caminho)) {
            return false;
        }

        const conteudo = this.gerarConteudoTemplate(nomeFormatado);
        return this.fileService.criaArquivo(caminho, conteudo);
    }

    gerarConteudoTemplate(nome: string): string {
        const templatePath = path.resolve(__dirname, "../dist/templates/Dto.tpl");
        let template = this.fileService.lerArquivo(templatePath);
        const nomeSemExtensao = nome.replace(/\.php$/i, "");
        template = template.replace("{{CLASS_NAME}}", nomeSemExtensao);
        return template;
    }

    formataNomeDto(nome: string): string {
        let nomeLimpo = nome.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");

        // Deixa a primeira letra maiúscula
        if (nomeLimpo.length > 0) {
            nomeLimpo = nomeLimpo.charAt(0).toUpperCase() + nomeLimpo.slice(1);
        }
        return `${nomeLimpo}.php`;
    }

}