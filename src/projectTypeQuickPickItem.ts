import { QuickPickItem } from "vscode";

export class ProjectTypeQuickPickItem implements QuickPickItem {
  public static projectTypes: QuickPickItem[] = [
    new ProjectTypeQuickPickItem({
      label: "classlib",
      description: "Class library"
    }),
    new ProjectTypeQuickPickItem({
      label: "console",
      description: "Console Application"
    }),
    new ProjectTypeQuickPickItem({
      label: "mstest",
      description: "Unit Test Project"
    }),
    new ProjectTypeQuickPickItem({
      label: "xunit",
      description: "xUnit Test Project"
    }),
    new ProjectTypeQuickPickItem({
      label: "web",
      description: "ASP.NET Core Empty"
    }),
    new ProjectTypeQuickPickItem({
      label: "mvc",
      description: "ASP.NET Core Web App (MVC)"
    }),
    new ProjectTypeQuickPickItem({
      label: "razor",
      description: "ASP.NET Core Web App"
    }),
    new ProjectTypeQuickPickItem({
      label: "angular",
      description: "ASP.NET Core with Angular"
    }),
    new ProjectTypeQuickPickItem({
      label: "react",
      description: "ASP.NET Core with ReactJS"
    }),
    new ProjectTypeQuickPickItem({
      label: "reactredux",
      description: "ASP.NET Core with ReactJS and Redux"
    }),
    new ProjectTypeQuickPickItem({
      label: "webapi",
      description: "ASP.NET Core Web API"
    })
  ];

  public label: string;
  public description: string;
  public detail?: string;
  public fullPath: string;
  public constructor(init?: Partial<ProjectTypeQuickPickItem>) {
    Object.assign(this, init);
  }
}
