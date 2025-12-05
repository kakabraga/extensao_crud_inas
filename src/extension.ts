// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { HorasCommand } from "./commands/HorasCommand";
import { TimeService } from "./services/TimeService";
import { HelloCommand } from './commands/HelloCommand';
import { HelloService } from './services/HelloService';
import { DtoService } from './services/DtoService';
import { DtoCommand } from './commands/DtoCommand';
import { FileService } from './services/FileService';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const dtoCommand = new DtoCommand();
	const criaCrud = vscode.commands.registerCommand(
		"criar_dto",
		() => dtoCommand.executaCriacao()
	);
	const deletaCrud = vscode.commands.registerCommand(
		"deleta_crud",
		() => dtoCommand.executaExclusao()
	);

	context.subscriptions.push(criaCrud, deletaCrud);
	// context.subscriptions.push(deletaCrud);
}
export function deactivate() { }
// This method is called when your extension is deactivated
