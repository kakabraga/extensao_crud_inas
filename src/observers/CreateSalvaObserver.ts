import { IObserver } from "../interfaces/IOberser";
import { SalvaService } from "../services/SalvaService";
import { IFileService } from "../interfaces/IFileService";

export class CreateSalvaObserver implements IObserver {

    private salvaService: SalvaService;

    constructor(fileService: IFileService) {
        this.salvaService = new SalvaService(fileService);
    }

    handle(payload: { nome: string }): void {
        this.salvaService.criaSave(payload.nome);
    }
    
    deleta(payload: { nome: string }): void {
        this.salvaService.deletaSave(payload.nome);
    }
}