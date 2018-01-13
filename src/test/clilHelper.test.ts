import * as should from 'should';
import { CliHelper } from '../cliHelper';

// Defines a Mocha test suite to group tests of similar kind together
suite("CliHelper Tests", () => {

    // Defines a Mocha unit test
    test("Empty project list", () => {
        const result = CliHelper.ParseListResult("sdsdadsdadadasd");
        should(result).be.empty();
        // assert.deepEqual(result, []);
    });

    test("Project list with one project", () => {
      const output = `Project reference(s)
      --------------------
      ..\\abc\\abc.csproj`;
      const result = CliHelper.ParseListResult(output);
      should(result).not.be.empty();
      should(result).be.length(1);
      should(result).containEql("..\\abc\\abc.csproj");
    });

    test("Project list with several projects", () => {
      const output = `Project reference(s)
      --------------------
      ..\\abc\\abc.csproj
      ..\\cde\\cde.csproj
      ..\\xyz\\xyz.csproj`;
      const result = CliHelper.ParseListResult(output);
      should(result).not.be.empty();
      should(result).be.length(3);
      should(result).containDeep(["..\\abc\\abc.csproj", "..\\cde\\cde.csproj", "..\\xyz\\xyz.csproj"]);
    });
});