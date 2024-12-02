import * as fs from "fs";
import * as path from "path";

export const readInput = (file: string) => {
  try {
    const absolutePath = path.resolve(__dirname, file);
    return fs.readFileSync(absolutePath, "utf-8").split(/\r?\n/);
  } catch (err) {
    console.error("Error reading the file:", err);
    return [];
  }
};
