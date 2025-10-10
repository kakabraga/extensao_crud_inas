import * as vscode from "vscode";
import { TimeService } from "../services/TimeService";

export class HorasCommand {
    constructor(private timeService: TimeService) {}

    register(context: vscode.ExtensionContext) {
        const disposable = vscode.commands.registerCommand("horas", () => {
        const time = this.timeService.getCurrentTime();
        vscode.window.showInformationMessage(`Horas atual: ${time.toString()}`);
        });
        context.subscriptions.push(disposable);
    }
}