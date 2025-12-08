import { IFileService } from "../interfaces/IFileService";
import { EventBus } from "../core/EventBus";
import * as path from 'path';
import * as vscode from "vscode";

export class DtoService {
    private readonly workspaceRoot: string;
    private readonly dtoDirectory: string;

    constructor(private fileService: IFileService, private observer: EventBus) {
        this.workspaceRoot = vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : '';
        this.dtoDirectory = path.join(this.workspaceRoot, "./dto");
    }

    criaDto(nome: string): boolean {
        const nomeFormatado = this.geraNomeArquivoDto(nome);
        const caminho = path.join(this.dtoDirectory, nomeFormatado);
        if (this.fileService.verificaArquivoExistente(caminho)) {
            return false;
        }
        const conteudo = this.gerarConteudoTemplate(nomeFormatado);
        const sucesso = this.fileService.criaArquivo(caminho, conteudo);
        if (sucesso) {
            this.chamaObserverCria(nomeFormatado);
            return true;
        }
        return false;
    }

    gerarConteudoTemplate(nome: string): string {
        const templatePath = path.resolve(__dirname, "../dist/templates/Dto.tpl");
        let template = this.fileService.lerArquivo(templatePath);
        const nomeSemExtensao = nome.replace(/\.php$/i, "");
        template = template.replace("{{CLASS_NAME}}", nomeSemExtensao);
        return template;
    }


    geraNomeArquivoDto(nome: string): string {
        let nomeLimpo = this.normalizaNomeClasse(nome);
        return `${nomeLimpo}.php`;
    }

    normalizaNomeClasse(nome: string): string {
        let nome_lower = nome.toLowerCase();
        let nomeLimpo = nome_lower.replace(/\s+/g, "").replace(/[^a-zA-Z0-9_]/g, "");
        nomeLimpo = nomeLimpo.replace(/_([a-zA-Z])/g, (_, letra) => letra.toUpperCase());
        nomeLimpo = nomeLimpo.charAt(0).toUpperCase() + nomeLimpo.slice(1);
        return nomeLimpo;
    }

    chamaObserverCria(nome: string): void {
        const nomeSemExtensao = nome.replace(/\.php$/i, "");
        this.observer.emit("dtoCriado", { nome: nomeSemExtensao });
    }
    chamaObserverDeleta(nome: string, event: string): void {
        const nomeSemExtensao = nome.replace(/\.php$/i, "");
        this.observer.emit(event, { nome: nomeSemExtensao });
    }

    async deletaDto(nome: string): Promise<void> {
        const nomeFormatado = this.geraNomeArquivoDto(nome);
        const filePath = path.join(this.workspaceRoot, `./dto/${nomeFormatado}`);
        await this.fileService.deletarArquivo(filePath);
        this.chamaObserverDeleta("dtoDeletado", nome);
    }

}