import * as axios from "axios";
import { execSync } from "child_process";
import * as fs from "fs";

// Fetch the list of IAM actions.
axios.default
  .get("https://awspolicygen.s3.amazonaws.com/js/policies.js")
  .then((response) => {
    generate(response.data);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

/**
 * Generate will generate the actions.ts file from the responseData parameter.
 * The actions.ts contains all IAM actions as enums.
 * @param responseBody
 */
function generate(responseBody: any): void {
  // Make sure the response body is string.
  if (typeof responseBody !== "string") {
    console.error(`Error: unexpected data type: ${typeof responseBody}`);
    process.exit(1);
  }

  // Parse the response body into an object.
  const data = JSON.parse(responseBody.slice("app.PolicyEditorConfig=".length));
  if (data === null) {
    console.error("Error: no data returned");
    process.exit(1);
  }

  // Remove the existing actions.ts file.
  try {
    fs.unlinkSync("lib/actions.ts");
  } catch (error) {
    // Do nothing, assume the file doesn't exist.
  }

  // Create a new actions.ts file.
  const stream = fs.createWriteStream("lib/actions.ts");
  stream.write("// This file is generated from bin/generate.ts. Do not edit directly.\n")

  // Loop over the keys in build the contense.
  for (const key of Object.keys(data["serviceMap"])) {
    // Fetch the service. For example, "Amazon S3".
    const service = data["serviceMap"][key];
    // Fetch the service prefix. For example, "s3".
    const prefix = service["StringPrefix"];

    // Format the key so it's suitable for an enum name.
    // So "Amazon S3" becomes "S3".
    let formattedKey = key;
    [" ", "(", ")", "-", "."].forEach((c) => {
      formattedKey = formattedKey.split(c).join("_");
    });
    ["Amazon", "AWS"].forEach((c) => {
      formattedKey = formattedKey.split(c).join("");
    });
    if (formattedKey[0] === "_") {
      formattedKey = formattedKey.slice(1);
    }

    // Write the start of the enum to actions.ts.
    stream.write(`export enum ${formattedKey.toUpperCase()} {\n`);

    // Format the actions and write them to actions.ts.
    service["Actions"].forEach((action: string) => {
      stream.write(
        `\t${action
          .replace(/([A-Z])/g, "_$1")
          .trim()
          .slice(1)
          .toUpperCase()} = "${prefix}:${action}",\n`
      );
    });

    stream.write(`}\n\n`);
  }

  // Format the files.
  execSync("npm run format");
}