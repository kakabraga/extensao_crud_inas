import { IObserver } from "../interfaces/IOberser";
import { DelService } from "../services/DelService";
import { IFileService } from "../interfaces/IFileService";

export class CreateDelObserver implements IObserver {

    private delService: DelService;

    constructor(fileService: IFileService) {
        this.delService = new DelService(fileService);
    }
    
    handle(payload: { nome: string }): void {
        this.delService.criaDel(payload.nome);
    }
}