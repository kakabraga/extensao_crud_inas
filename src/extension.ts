// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {



	function fetchHours() {
		const hora = new Date().getHours();
		const minutos = new Date().getUTCMinutes();
		const horario = hora + ":" + minutos;
		vscode.window.showInformationMessage("horas FETCH" + horario);
	}
	let horario = vscode.commands.registerCommand('phpCrudInas.gerarCrud', () => {
       fetchHours();
    });

	//fetchHours(); chamada da função

	context.subscriptions.push(horario);
}

// This method is called when your extension is deactivated
export function deactivate() { }
