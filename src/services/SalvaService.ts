import { IFileService } from "../interfaces/IFileService";
import * as path from 'path';
import * as vscode from "vscode";

export class SalvaService {
    private readonly workspaceRoot: string;
    private readonly dtoDirectory: string;

    constructor(private fileService: IFileService) {
        this.workspaceRoot = vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : '';
        this.dtoDirectory = path.join(this.workspaceRoot, "./projeto");
    }

    criaSave(nome: string): boolean {
        const nomeFormatado = this.geraNomeArquivoDto(nome);
        const caminho = path.join(this.dtoDirectory, nomeFormatado);
        if (this.fileService.verificaArquivoExistente(caminho)) {
            return false;
        }
        const conteudo = this.gerarConteudoTemplate(nome);
        this.fileService.criaArquivo(caminho, conteudo);
        return true;
    }

    gerarConteudoTemplate(nome: string): string {
        const templatePath = path.resolve(__dirname, "../dist/templates/Save.tpl");
        let template = this.fileService.lerArquivo(templatePath);
        const nomeSemExtensao = nome.replace(/\.php$/i, "");
        const nomeLowerCase = this.toLowerCase(nome);
        const variavel = this.gerarVariavel(nome);
        const dados: Record<string, string> = {
            CLASS_NAME: nomeSemExtensao,
            INSTANCIA: nomeLowerCase,
            VARIAVEL: variavel,
        };
        template = this.substituirPlaceholders(template, dados);
        return template;
    }


    geraNomeArquivoDto(nome: string): string {
        let nomeLimpo = this.normalizaNomeClasse(nome);
        return `${nomeLimpo}.php`;
    }

    normalizaNomeClasse(nome: string): string {
        if (!nome) { return "save_"; }

        let nomelimpo = nome.trim().replace(/^save_/i, ""); // remove prefixo
        nomelimpo = nomelimpo.replace(/([a-z0-9])([A-Z])/g, "$1_$2"); // insere _
        nomelimpo = nomelimpo.toLowerCase();

        return `save_${nomelimpo}`;
    } 


    toLowerCase(nome: string): string {
        nome = nome.replace(/([a-z0-9])([A-Z])/g, "$1_$2");
        return nome.toLowerCase();
    }

    substituirPlaceholders(template: string, dados: Record<string, string>): string {
        for (const chave in dados) {
            const regex = new RegExp(`{{${chave}}}`, "g");
            template = template.replace(regex, dados[chave]);
        }
        return template;
    }

    gerarVariavel(nome: string): string {
        const nomeLowerCase =this.toLowerCase(nome); 
         return nomeLowerCase.charAt(0);
    }
}