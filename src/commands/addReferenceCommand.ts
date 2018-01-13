import * as vscode from 'vscode';
import { ICliCall } from '../cliWrapper';
import { ProjectPickerItem } from '../projectPickerItem';
import { ProjectTypeQuickPickItem } from '../projectTypeQuickPickItem';

export class AddReferenceCommand {
   public constructor(private cliCall: ICliCall) {}

   public execute(res: vscode.Uri) {
      vscode.workspace.findFiles("**/*.csproj").then((values: vscode.Uri[]) => {
         const items = values.filter((value: vscode.Uri) => value.path !== res.path)
         .map<ProjectPickerItem>((value: vscode.Uri) => {
             const fileName = value.path.substring(value.path.lastIndexOf("/") + 1);
             return new ProjectPickerItem({label: fileName, description: value.fsPath, fullPath: value.fsPath });
         });

         vscode.window.showQuickPick(items).then((selectedItem) => {
             if (!selectedItem) { return; }
             this.cliCall.addReference(res.fsPath, selectedItem.fullPath)
             .then(message => vscode.window.showInformationMessage(message));
         });
     });
   }
}