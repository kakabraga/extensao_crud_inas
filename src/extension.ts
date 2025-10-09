// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {



	let horario = vscode.commands.registerCommand('phpCrudInas.gerarCrud', () => {
		fetchHours();
	});
	const currentDir = process.cwd();
	function fetchHours() {
		const hora = new Date().getHours();
		const minutos = new Date().getUTCMinutes();
		const horario = hora + ":" + minutos;
		vscode.window.showInformationMessage("horas FETCH" + horario);
	}
	function isPhp() {
		vscode.window.showInformationMessage('Você está utilizando PHP');
	}

	const pathActions = "./actions";
	const pathDto = "projeto/dto";


	function verificaWorkspace(): boolean {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		return !!workspaceFolders && workspaceFolders.length > 0;
	}

	function verificaRaizProjeto(): boolean {
		if (!verificaWorkspace()) {
			return false;
		}

		const workspaceFolders = vscode.workspace.workspaceFolders!;
		const projetoPath = path.resolve(workspaceFolders[0].uri.fsPath);

		return path.basename(projetoPath) === 'projeto';
	}

	function verificaDTO(pathDto: string): boolean {
		if (!verificaRaizProjeto()) {
			return false;
		}
		const caminhoRaiz = getPathProjeto();
		const caminhoCompleto = path.join(caminhoRaiz, pathDto);
		return fs.existsSync(caminhoCompleto);
	}

	function msgRaiz() {
		const estaNaRaiz = verificaRaizProjeto();
		const mensagem = estaNaRaiz
			? 'Você está na raiz do projeto.'
			: 'Você não está na raiz do projeto.';
		vscode.window.showInformationMessage(mensagem);
	}


	function msgDto() {
		const existeDto = verificaDTO(pathDto);
		// const mensagem = existeDto
		// 	? '✅ Pasta "dto" encontrada.'
		// 	: '❌ Pasta "dto" não encontrada.';
		const mensagem = getPathProjeto(pathDto);
		vscode.window.showInformationMessage(mensagem);
	}

	function getPathProjeto(): string {
		const workspaceFolders = vscode.workspace.workspaceFolders!;
		const projetoPath = path.resolve(workspaceFolders[0].uri.fsPath);
		return projetoPath;
	}

	function isFolder(pathActions: string): boolean {
		return fs.existsSync(pathActions) && fs.lstatSync(pathActions).isDirectory();
	}

	function testeRaiz() {
		vscode.window.showInformationMessage(path.resolve(process.cwd()));
	}

	// function criaArquivoManter($) {

	// }

	// function criaArquivo
	let msgLanguage = vscode.commands.registerCommand('is_php', () => {
		isPhp();
	});
	let folderDTO = vscode.commands.registerCommand('is_dto', () => {
		msgDto();
	});
	let raizProjeto = vscode.commands.registerCommand('raiz_projeto', () => {
		msgRaiz(); // <-- corrigido
	});
	isPhp();
	msgRaiz();
	msgDto();
	context.subscriptions.push(horario, msgLanguage, raizProjeto, folderDTO);
}

// This method is called when your extension is deactivated
export function deactivate() { }
