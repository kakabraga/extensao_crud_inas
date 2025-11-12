import { IFileService } from "../interfaces/IFileService";
import * as path from 'path';
import * as vscode from "vscode";

export class DelService {
    private readonly workspaceRoot: string;
    private readonly dtoDirectory: string;

    constructor(private fileService: IFileService) {
        this.workspaceRoot = vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : '';
        this.dtoDirectory = path.join(this.workspaceRoot, "./projeto");
    }

    criaDel(nome: string): boolean {
        const nomeFormatado = this.geraNomeArquivoDel(nome);
        const caminho = path.join(this.dtoDirectory, nomeFormatado);
        if (this.fileService.verificaArquivoExistente(caminho)) {
            return false;
        }
        const conteudo = this.gerarConteudoTemplate(nome);
        this.fileService.criaArquivo(caminho, conteudo);
        return true;
    }

    gerarConteudoTemplate(nome: string): string {
        const templatePath = path.resolve(__dirname, "../dist/templates/Del.tpl");
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


    geraNomeArquivoDel(nome: string): string {
        let nomeLimpo = this.normalizaNomeClasse(nome);
        return `${nomeLimpo}.php`;
    }

    normalizaNomeClasse(nome: string): string {
        if (!nome) { return "del_"; }

        let nomelimpo = nome.trim().replace(/^del/i, ""); // remove prefixo
        nomelimpo = nomelimpo.replace(/([a-z0-9])([A-Z])/g, "$1_$2"); // insere _
        nomelimpo = nomelimpo.toLowerCase();

        return `del_${nomelimpo}`;
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