import * as vscode from 'vscode';
import { ICliCall } from '../cliWrapper';
import { ProjectPickerItem } from '../projectPickerItem';
import { ProjectTypeQuickPickItem } from '../projectTypeQuickPickItem';

export class AddProjectCommand {
   public constructor(private cliCall: ICliCall) {}

   public execute(res: vscode.Uri) {
      vscode.window.showInputBox({ value: res.fsPath, prompt: "Target folder" }).then(path => {
         if (!path) { return; }

         const options = { ignoreFocusOut: true, matchOnDescription: true };
         vscode.window.showQuickPick(ProjectTypeQuickPickItem.projectTypes, options).then(projectType => {
             if (!projectType) { return; }
             const normalizedPath = path.split("\\").join("/");
             const fileName = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);
             vscode.window.showInputBox({ value: fileName, prompt: "project name" }).then(projectName => {
                 if (!fileName) { return; }
                 this.cliCall.createProject(path, projectType.label, projectName).then(message => {
                     vscode.workspace.findFiles("**/*.sln").then(files => {
                         vscode.window.showInformationMessage(message);
                         if (files.length === 1) {
                             this.cliCall.addProjectToSolution(files[0].fsPath, path, projectName).then(slnMessage => {
                                 vscode.window.showInformationMessage(slnMessage);
                             });
                         } else if (files.length > 1) {
                             vscode.window.showInformationMessage("More than one solution found. Project was not added.");
                         }
                     });
                 });
             });
         });
     });
   }
}