// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "winex-code-info" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('winex-code-info.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from winex-code-info!111');

		// 创建一个WebviewPanel
		const panel = vscode.window.createWebviewPanel(
			'sidebarWebview', // viewType
			'Sidebar', // 视图标题
			vscode.ViewColumn.One, // 这将把面板放置在编辑器的第一个位置
			{
					// Webview options
					enableScripts: true // 允许执行嵌入的脚本
			}
		);

		// 为面板指定HTML内容
		panel.webview.html = getWebviewContent();


	});

	context.subscriptions.push(disposable);

}

function getWebviewContent() {
	return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Sidebar Content</title>
			</head>
			<body>
					<h1>Sidebar Content</h1>
					<p>This is some content in the sidebar.</p>
			</body>
			</html>
	`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
