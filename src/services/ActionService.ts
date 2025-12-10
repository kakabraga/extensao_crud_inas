import * as path from 'path';
import { IFileService } from "../interfaces/IFileService";
import * as vscode from "vscode";
export class ActionService {

    private readonly workspaceRoot: string;
    private readonly dtoDirectory: string;

    constructor(private fileService: IFileService) {
        this.workspaceRoot = vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : '';
        this.dtoDirectory = path.join(this.workspaceRoot, "./actions");
    }
    criaAction(nome: string): boolean {
        const nomeFormatado = this.geraNomeArquivoAction(nome);
        const caminho = path.join(this.dtoDirectory, nomeFormatado);
        if (this.fileService.verificaArquivoExistente(caminho)) {
            return false;
        }
        const conteudo = this.gerarConteudoTemplate(nomeFormatado);
        this.fileService.criaArquivo(caminho, conteudo);
        return true;
    }


    gerarConteudoTemplate(nome: string): string {
        const templatePath = path.resolve(__dirname, "../dist/templates/Action.tpl");
        let template = this.fileService.lerArquivo(templatePath);
        const nomeSemExtensao = nome.replace(/\.php$/i, "");
        template = template.replace(/{{CLASS_NAME}}/g, nomeSemExtensao);
        return template;
    }

    geraNomeArquivoAction(nome: string): string {
        let nomeFormatado = this.normalizaNomeClasse(nome);
        return `${nomeFormatado}`;
    }

    normalizaNomeClasse(nome: string): string {
        let nomeLimpo = nome.replace(/\s+/g, "").replace(/[^a-zA-Z0-9_]/g, "");
        nomeLimpo = nomeLimpo.replace(/_([a-zA-Z])/g, (_, letra) => letra.toUpperCase());
        nomeLimpo = nomeLimpo.charAt(0).toUpperCase() + nomeLimpo.slice(1);
        return `Manter${nomeLimpo}.php`;
    }
    async deletaAction(nome: string): Promise<void> {
        const nomeFormatado = this.geraNomeArquivoAction(nome);
        const filePath = path.join(this.workspaceRoot, `/${nomeFormatado}`);
        await this.fileService.deletarArquivo(filePath);
    }
}