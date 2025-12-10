import { IObserver } from "../interfaces/IOberser";
import { GetService } from "../services/GetService";
import { IFileService } from "../interfaces/IFileService";

export class CreateGetObserver implements IObserver {

    private getService: GetService;

    constructor(fileService: IFileService) {
        this.getService = new GetService(fileService);
    }
    
    handle(payload: { nome: string }): void {
        this.getService.criaGet(payload.nome);
    }
    deleta(payload: { nome: string }): void {
        console.log("PAYLOAD RECEBIDO EM CREATE GET OBSERVER: " + payload.nome);
        this.getService.deletaGet(payload.nome);
    }
}