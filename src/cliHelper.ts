export class CliHelper {
   public static ParseListResult(listReferencesOutput: string): string[]  {
      if (listReferencesOutput.indexOf(this.referenceListSeparator) > -1) {
         const projectString = listReferencesOutput.split(this.referenceListSeparator)[1];
         const projects = projectString.split("\n").map(value => value.trim()).filter(v => v !== '');
         return projects;
      }

      return [];
   }

   private static referenceListSeparator = "--------------------";
}