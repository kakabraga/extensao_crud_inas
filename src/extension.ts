// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { HorasCommand } from "./commands/HorasCommand";
import { TimeService } from "./services/TimeService";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const timeService = new TimeService();
	const horasCommand = new HorasCommand(timeService);
	horasCommand.register(context);
	const time = timeService.getCurrentTime();
	vscode.window.showInformationMessage(`Hora atual: ${time.toString()}`);
}
export function deactivate() { }
// This method is called when your extension is deactivated
