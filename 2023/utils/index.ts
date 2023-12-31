import * as fs from "fs";
import * as path from "path";

export const readLinesFromFile = (
  dir: string,
  relativePath: string
): string[] => {
  try {
    const absolutePath = path.resolve(dir, relativePath);
    return fs.readFileSync(absolutePath, "utf-8").split(/\r?\n/);
  } catch (err) {
    console.error("Error reading the file:", err);
    return [];
  }
};

export const readFromFile = (
  dir: string,
  relativePath: string
): string | undefined => {
  try {
    const absolutePath = path.resolve(dir, relativePath);
    return fs.readFileSync(absolutePath, "utf-8");
  } catch (err) {
    console.error("Error reading the file:", err);
  }
};

export type StringMap = { [key: string]: number };
