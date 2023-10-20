const fs = require("fs/promises");
const path = require("path");
const { minify } = require("uglify-js");

(async () => {
  try {
    const fileName = "user-ip";
    console.log(__dirname);
    console.log(".env", process.env.HOST);

    const fileContent = await fs.readFile(
      path.resolve(__dirname, `../webflow/scripts/${fileName}.js`),
      {
        encoding: "utf-8",
      },
    );

    const parts = fileContent.split(/const BASE_URL = ".*";/gim);
    const url = `const BASE_URL = "${process.env.HOST}"`;

    console.log(parts[0] + "\n" + url + "\n" + parts[1]);

    const minifiedCode = minify(parts[0] + "\n" + url + "\n" + parts[1]);

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
