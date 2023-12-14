import * as fs from "fs";
import * as path from "path";

//// * Day 1: Trebuchet?!

// Pt. I: Combine 1st and last digit from each string and sum
const firstAndLast = (input: (string | number)[]) =>
  `${input[0]}${input[input.length - 1]}`;

const calibrateLine = (input: string) => {
  const nums: number[] = [];
  for (let c of input) {
    const parsed = parseInt(c);
    if (isNaN(parsed)) continue;
    nums.push(parsed);
  }

  return parseInt(firstAndLast(nums));
};

const calibrateSet = (input: string[], calibrator: (line: string) => number) =>
  input.reduce((sum, line) => (sum += calibrator(line)), 0);

const readLinesFromFile = (relativePath: string): string[] => {
  try {
    const absolutePath = path.resolve(__dirname, relativePath);
    return fs.readFileSync(absolutePath, "utf-8").split(/\r?\n/);
  } catch (err) {
    console.error("Error reading the file:", err);
    return [];
  }
};

//  Pt. II: Now you need to include spelled out letters as valid digits.
const calibrateLine2 = (input: string) => {
  const spelledToNum: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  // Get Matches:
  const regex = /(one|two|three|four|five|six|seven|eight|nine|\d)/g;
  const matches: string[] = [];

  let match;
  while ((match = regex.exec(input)) !== null) {
    matches.push(match[0]);
    // Set the regex lastIndex to start from the end of the current match
    regex.lastIndex = match.index + 1;
  }

  const nums = matches.map((m) =>
    spelledToNum[m] ? spelledToNum[m] : parseInt(m)
  );

  return parseInt(firstAndLast(nums));
};

const linesFromFile = readLinesFromFile("input.txt");

// Solutions:
console.log("Solution 1:", calibrateSet(linesFromFile, calibrateLine));
console.log("Solution 2:", calibrateSet(linesFromFile, calibrateLine2));
