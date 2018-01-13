import * as vscode from 'vscode';
import { ICliCall } from '../cliWrapper';

export class RemoveReferenceCommand {
   public constructor(private cliCall: ICliCall) {}

   public execute(res: vscode.Uri) {
      this.cliCall.getReferences(res.fsPath).then(references => {
         vscode.window.showQuickPick(references).then((selectedItem) => {
             if (!selectedItem) { return; }

             this.cliCall.removeReference(res.fsPath, selectedItem).then((message) => {
                 vscode.window.showInformationMessage(message);
             });
         });
     });
   }
}