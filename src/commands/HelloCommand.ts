import * as vscode from "vscode";
import { HelloService } from "../services/HelloService";

export class HelloCommand {
    constructor(private HelloService: HelloService) { }

    register(context: vscode.ExtensionContext) {
        const disposable = vscode.commands.registerCommand("hello", () => {
            const mensagem = this.HelloService.getHelloMsg();
            vscode.window.showInformationMessage(`Mensagem teste: ${mensagem}`);
        });
        context.subscriptions.push(disposable);
    }
}