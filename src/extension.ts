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
import { FileService } from './services/FileService';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	
	// const timeService = new TimeService();
	// const horasCommand = new HorasCommand(timeService);

	// const helloService = new HelloService();
	// const helloCommand = new HelloCommand(helloService);
	// const fileService  = new FileService();
	// const dtoService = new DtoService(fileService);
	// horasCommand.horas(context);
	// horasCommand.register(context);
	// helloCommand.register(context);
	// const hello = helloService.getHelloMsg();
	// const time = timeService.getCurrentTime();
	// vscode.window.showInformationMessage(`Hora atual: ${time.toString()}`);
	// const nomePadrao = dtoService.formataNomeDto("Usuario Teste");
	// vscode.window.showInformationMessage(`Nome padronizado: ${nomePadrao}`);
}
export function deactivate() { }
// This method is called when your extension is deactivated
