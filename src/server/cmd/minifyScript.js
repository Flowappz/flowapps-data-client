const fs = require("fs/promises");
const path = require("path");
const { minify } = require("uglify-js");

(async () => {
  try {
    const fileName = process.argv[2];
    console.log(__dirname);

    const fileContent = await fs.readFile(
      path.resolve(__dirname, `../webflow/scripts/${fileName}.js`),
      {
        encoding: "utf-8",
      },
    );

    const minifiedCode = minify(fileContent);

    await fs.writeFile(
      path.resolve(__dirname, `../webflow/scripts/minified/${fileName}.min.js`),
      minifiedCode.code,
      {
        encoding: "utf-8",
      },
    );

    console.log("Done!");
  } catch (err) {
    console.log("err: ", err);
  }
})();
