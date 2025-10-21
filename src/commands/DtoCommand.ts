import * as vscode from "vscode";
import * as path from "path";
import { FileService } from "../services/FileService";
import { DtoService } from "../services/DtoService";
import { EventBus } from "../core/EventBus";
import { CreateActionObserver } from "../observers/CreateActionObserver";

export class DtoCommand {
    private dtoService: DtoService;
    private eventBus = new EventBus();

    constructor() {
        const workspaceRoot = vscode.workspace.rootPath || '';
        const fileService = new FileService();
        this.dtoService = new DtoService(fileService);
        const createActionObserver = new CreateActionObserver(fileService);
        this.eventBus.on("dtoCriado", (payload) => createActionObserver.handle(payload));
    }

    async chamaPrompt(): Promise<string | undefined> {
        const input = await vscode.window.showInputBox({
            prompt: "Digite o nome do DTO (sem 'Dto')",
            placeHolder: "Exemplo: Usuario",
        });

        if (!input) {
            vscode.window.showErrorMessage("Nome inválido. O DTO não foi criado.");
            return undefined;
        }

        return input;
    }

    async execute() {
        const nome = await this.chamaPrompt();
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
