import { IObserver } from "../interfaces/IOberser";
import { ActionService } from "../services/ActionService";
import { IFileService } from "../interfaces/IFileService";

export class CreateActionObserver implements IObserver {

    private actionService: ActionService;

    constructor(fileService: IFileService) {
        this.actionService = new ActionService(fileService);
    }
    
    handle(payload: { nome: string }): void {
        this.actionService.criaAction(payload.nome);
    }
}