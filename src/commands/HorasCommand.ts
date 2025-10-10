import * as vscode from "vscode";
import { TimeService } from "../services/TimeService";
import { TimeInfo } from "../models/TimeInfo";

export class HorasCommand {
    constructor(private timeService: TimeService) { }

    register(context: vscode.ExtensionContext) {
        const disposable = vscode.commands.registerCommand("horas", () => {
            const time = this.timeService.getCurrentTime();
            vscode.window.showInformationMessage(`Horas atual: ${time.toString()}`);
        });
        context.subscriptions.push(disposable);
    }

    horas(context: vscode.ExtensionContext) {
        const disposable = vscode.commands.registerCommand("turno", () => {
            const diffMs = this.timeService.getCalculaDiferencaHoras();
            const diff = this.timeService.getCalculaDiferencaHorasFormatada(diffMs);
            const timeInfo = new TimeInfo(0, 0, 0); // só para usar o método de formatação
            const diffFormatted = `${diff.hours}h ${diff.minutes}min`;
            const message = timeInfo.toStringHoras(diffFormatted);
            vscode.window.showInformationMessage(message);
        });
        context.subscriptions.push(disposable);
    }

}