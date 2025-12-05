import * as vscode from "vscode";
import * as path from "path";
import { FileService } from "../services/FileService";
import { DtoService } from "../services/DtoService";
import { EventBus } from "../core/EventBus";
import { CreateActionObserver } from "../observers/CreateActionObserver";
import { CreateSalvaObserver } from "../observers/CreateSalvaObserver";
import { CreateDelObserver } from "../observers/CreateDelObserver";
import { CreateGetObserver } from "../observers/CreateGetObserver";

export class DtoCommand {
    private dtoService: DtoService;
    private eventBus = new EventBus();

    constructor() {
        const workspaceRoot = vscode.workspace.rootPath || '';
        const fileService = new FileService();
        this.dtoService = new DtoService(fileService, this.eventBus);
        const createActionObserver = new CreateActionObserver(fileService);
        const createSalvaObserver = new CreateSalvaObserver(fileService);
        const createDelObserver = new CreateDelObserver(fileService);
        const createGetObserver = new CreateGetObserver(fileService);
        this.eventBus.on("dtoCriado", (payload) => createActionObserver.handle(payload));
        this.eventBus.on("dtoCriado", (payload) => createSalvaObserver.handle(payload));
        this.eventBus.on("dtoCriado", (payload) => createDelObserver.handle(payload));
        this.eventBus.on("dtoCriado", (payload) => createGetObserver.handle(payload));
        this.eventBus.on("dtoDeletado", (payload) => createGetObserver.deleta(payload));
    }

    async criaCrud(): Promise<string | undefined> {
        const input = await vscode.window.showInputBox({
            prompt: "Digite o nome da tabela",
            placeHolder: "Exemplo: usuario_inas",
        });

        if (!input) {
            vscode.window.showErrorMessage("Nome inválido. O DTO não foi criado.");
            return undefined;
        }

        return input;
    }

    async deletaCrud(): Promise<string | undefined> {
        const input = await vscode.window.showInputBox({
            prompt: "Digite o nome da tabela para deletar",
            placeHolder: "Exemplo: usuario_inas",
        });

        if (!input) {
            vscode.window.showErrorMessage("Não foi possivel deletar");
            return undefined;
        }

        return input;
    }

    async executaExclusao() {
        const nome = await this.deletaCrud();
        if (!nome) {
            return;
        }

        let caminho = this.dtoService.geraNomeArquivoDto(nome);
            vscode.window.showInformationMessage("DTO" + this.dtoService.deletaDto(nome) + "CAMINHO: " + caminho);


        // if (!sucesso) {
        //     vscode.window.showErrorMessage(
        //         `Erro: O DTO "${nome}Dto.php" não existe ou já foi deletado.`
        //     );
        // }
    }

    async executaCriacao() {
        const nome = await this.criaCrud();
        if (!nome) {
            return;
        }

        const sucesso = this.dtoService.criaDto(nome);

        if (sucesso) {
            vscode.window.showInformationMessage(`DTO "${nome}Dto.php" criado com sucesso!`);
        }

        if (!sucesso) {
            vscode.window.showErrorMessage(
                `Erro: O DTO "${nome}Dto.php" já existe ou não pôde ser criado.`
            );
        }
    }
}
