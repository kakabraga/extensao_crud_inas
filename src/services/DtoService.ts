import { FileService } from "./FileService";
import * as path from 'path';

export class DtoService {
    private readonly dtoDirectory = "src/Dto";
    constructor(private fileService: FileService) { }

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
        const templatePath = path.resolve(this.dtoDirectory, "../templates/Dto.tpl");
        let template = this.fileService.lerArquivo(templatePath);
        const nomeSemExtensao = nome.replace(/\.php$/i, "");
        template = template.replace("{{CLASS_NAME}}", nomeSemExtensao);
        return template;
    }

    formataNomeDto(nome: string): string {
        const nomeLimpo = nome.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
        return `${nomeLimpo}.php`;
    }

}