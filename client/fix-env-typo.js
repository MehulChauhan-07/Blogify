// This script fixes the getEvn typo by replacing it with getEnv in all files
// Run this with Node.js to fix all instances of the typo

import fs from "fs";
import path from "path";
import { promisify } from "util";

console.log("Starting the fix script...");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Directories to search in
const directories = [
  path.resolve(__dirname, "src/pages"),
  path.resolve(__dirname, "src/components"),
  path.resolve(__dirname, "src/helpers"),
  // Add other directories as needed
];

// Function to recursively get all files in directories
async function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

// Function to fix the typo in a file
async function fixFile(filePath) {
  try {
    // Only process JavaScript/JSX files
    if (!filePath.endsWith(".js") && !filePath.endsWith(".jsx")) return;

    const content = await readFile(filePath, "utf8");

    // Replace in import statements
    const importFixed = content.replace(
      /import\s*{\s*getEvn\s*}/g,
      "import { getEnv }"
    );

    // Replace in function calls
    const callsFixed = importFixed.replace(/getEvn\(['"]VITE/g, "getEnv('VITE");

    // Write the file back if changes were made
    if (content !== callsFixed) {
      await writeFile(filePath, callsFixed, "utf8");
      console.log(`Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Main function
async function main() {
  try {
    // Get all files from directories
    let allFiles = [];
    for (const dir of directories) {
      const files = await getFiles(dir);
      allFiles = [...allFiles, ...files];
    }

    // Process all files
    await Promise.all(allFiles.map(fixFile));

    console.log("All files processed successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
