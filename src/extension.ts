'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CliWrapper } from './cliWrapper';
import { AddProjectCommand } from './commands/addProjectCommand';
import { AddReferenceCommand } from './commands/addReferenceCommand';
import { RemoveReferenceCommand } from './commands/removeReferenceCommand';
import { ProjectPickerItem } from './projectPickerItem';
import { ProjectTypeQuickPickItem } from './projectTypeQuickPickItem';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const cliCall = new CliWrapper();
    cliCall.getCliVersion().then(version => console.log(version));

    let addReferenceCommand = vscode.commands.registerCommand('dotnetcli.addReference', (res: vscode.Uri) => {
        const cmd = new AddReferenceCommand(cliCall);
        cmd.execute(res);
    });

    context.subscriptions.push(addReferenceCommand);

    let removeReferenceCommand = vscode.commands.registerCommand('dotnetcli.removeReference', (res: vscode.Uri) => {
        const cmd = new RemoveReferenceCommand(cliCall);
        cmd.execute(res);
    });

    context.subscriptions.push(removeReferenceCommand);

    let addProjectCommand = vscode.commands.registerCommand('dotnetcli.addproject', (res: vscode.Uri) => {
        const cmd = new AddProjectCommand(cliCall);
        cmd.execute(res);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}