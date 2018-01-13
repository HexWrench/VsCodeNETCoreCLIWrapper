import * as shell from 'shelljs';
import { CliHelper } from './cliHelper';

export class CliWrapper implements ICliCall {
   public addReference(project: string, reference: string): Promise<string> {
      const cli = "dotnet add " + project  + " reference " + reference;

      return new Promise<string>(done => {
         const result = shell.exec(cli, {async: true}, (code: any, stdout: any, stderr: any) => {
            done(stdout + stderr);
         });
      });
   }

   public getReferences(project: string): Promise<string[]> {
      const cli = "dotnet list " + project + " reference";

      return new Promise<string[]>(done => {
         const result = shell.exec(cli, {async: true}, (code: any, stdout: any, stderr: any) => {
            let projects = [];
            if (stdout) {
               projects = CliHelper.ParseListResult(stdout);
            }

            done(projects);
         });
      });
   }

   public removeReference(project: string, reference: string): Promise<string> {
      const cli = "dotnet remove " + project + " reference " + reference;

      return new Promise<string>(done => {
         const result = shell.exec(cli, {async: true}, (code: any, stdout: any, stderr: any) => {
            done(stdout + stderr);
         });
      });
   }

   public getCliVersion(): Promise<string> {
      const cli = "dotnet --version";

      return new Promise<string>(done => {
         const result = shell.exec(cli, {async: true}, (code: any, stdout: any, stderr: any) => {
            done(stdout);
         });
      });
   }

   public createProject(path: string, projectType: string, projectName: string): Promise<string> {
      const cli = `dotnet new ${projectType} -n ${projectName} -o ${path}`;

      return new Promise<string>(done => {
         const result = shell.exec(cli, {async: true}, (code: any, stdout: any, stderr: any) => {
            done(stdout + stderr);
         });
      });
   }

   public addProjectToSolution(solution: string, path: string, projectName: string): Promise<string> {
      const cli = `dotnet sln ${solution} add ${path}/${projectName}.csproj`;

      return new Promise<string>(done => {
         const result = shell.exec(cli, {async: true}, (code: any, stdout: any, stderr: any) => {
            done(stdout + stderr);
         });
      });
   }
}

export interface ICliCall {
   addReference(project: string, reference: string): Promise<string>;
   getReferences(project: string): Promise<string[]>;
   removeReference(project: string, reference: string): Promise<string>;
   getCliVersion(): Promise<string>;
   createProject(path: string, projectType: string, projectName: string): Promise<string>;
   addProjectToSolution(solution: string, path: string, projectName: string): Promise<string>;
}