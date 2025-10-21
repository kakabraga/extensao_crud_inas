import * as path from 'path';
import { IFileService } from "../interfaces/IFileService";

export class ActionService {

    constructor(private fileService: IFileService) { }

    criaAction(nome: string): boolean {
        const nomeArquivo = this.geraNomeArquivoDto(nome);

        if (this.fileService.verificaArquivoExistente(nomeArquivo)) {
            return false;
        }

        return false;
    }

    gerarConteudoTemplate(nome: string): string {
        const templatePath = path.resolve(__dirname, "../dist/templates/Action.tpl");
        let template = this.fileService.lerArquivo(templatePath);
        const nomeSemExtensao = nome.replace(/\.php$/i, "");
        template = template.replace("{{CLASS_NAME}}", nomeSemExtensao);
        return template;
    }
    geraNomeArquivoDto(nome: string): string {
        let nomeFormatado = this.normalizaNomeClasse(nome);
        return `${nomeFormatado}.php`;
    }

    normalizaNomeClasse(nome: string): string {
        let nomeLimpo = nome.replace(/\s+/g, "").replace(/[^a-zA-Z0-9_]/g, "");
        nomeLimpo = nomeLimpo.replace(/_([a-zA-Z])/g, (_, letra) => letra.toUpperCase());
        nomeLimpo = nomeLimpo.charAt(0).toUpperCase() + nomeLimpo.slice(1);
        return `Manter${nomeLimpo}`;
    }
}