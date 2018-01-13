import { QuickPickItem } from "vscode";

export class ProjectPickerItem implements QuickPickItem {
   public label: string;
   public description: string;
   public detail?: string;
   public fullPath: string;

   public constructor(init?: Partial<ProjectPickerItem>) {
      Object.assign(this, init);
  }
}