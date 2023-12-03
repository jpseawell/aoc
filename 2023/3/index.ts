import { readLinesFromFile } from "../utils";

//// Day 3: Gear Ratios
// Pt. I
const testInput = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

const fileInput = readLinesFromFile(__dirname, "input.txt");

type Point = {
  x: number;
  y: number;
};

// find symbols
/**
 * return 2d coords for
 * each symbol location
 */
const symbolIndices = (input: string) => {
  const regex = /[^\w\s.]/g;
  const indices: number[] = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    indices.push(match.index);
  }

  return indices;
};

const findSymbols = (input: string[]) => {
  const coords: Point[] = [];
  let x = 0;
  let y = 0;

  for (let row of input) {
    for (let idx of symbolIndices(row)) {
      coords.push({ x: idx, y });
    }

    y++;
  }

  return coords;
};

// find numbers around symbol
/**
 * - check 6 slots around symbol
 * - if there's a number.. capture it
 */
const getChar = (input: string[], { x, y }: Point) => input[y].charAt(x);

const up = (coord: Point): Point => ({ x: coord.x, y: coord.y - 1 });
const right = (coord: Point): Point => ({ x: coord.x + 1, y: coord.y });
const down = (coord: Point): Point => ({ x: coord.x, y: coord.y + 1 });
const left = (coord: Point): Point => ({ x: coord.x - 1, y: coord.y });
const upRight = (coord: Point) => up(right(coord));
const upLeft = (coord: Point) => up(left(coord));
const downLeft = (coord: Point) => down(left(coord));
const downRight = (coord: Point) => down(right(coord));

const isNum = (s: string) => !isNaN(parseInt(s));

type DirFunc = (coord: Point) => Point;
const dirs: DirFunc[] = [
  up,
  upRight,
  right,
  downRight,
  down,
  downLeft,
  left,
  upLeft,
];

const checkAdjacent = (input: string[], coord: Point) => {
  const adjacentNums: Point[] = [];

  for (let dir of dirs) {
    const adjacent = dir(coord);
    if (isNum(getChar(input, adjacent))) adjacentNums.push(adjacent);
  }

  return adjacentNums;
};

const extractNum = (input: string, index: number) => {
  // Regular expression to find all numbers in the string
  const regex = /\d+/g;
  let match;

  // Iterate over all number matches
  while ((match = regex.exec(input)) !== null) {
    // Check if the given index falls within the current match
    if (index >= match.index && index < match.index + match[0].length) {
      return match[0] as string; // Return the entire number as a string
    }
  }

  return null; // Return null if no number contains the index
};

const sum = (nums: number[]) => {
  let sum = 0;
  for (let n of nums) {
    sum += n;
  }
  return sum;
};

const sumAdjacentNums = (input: string[], symbols: Point[]) => {
  const adjNums: number[] = [];

  for (let symbol of symbols) {
    const nums: number[] = [];
    const adjDigitCoords = checkAdjacent(input, symbol);

    for (let coord of adjDigitCoords) {
      const num = parseInt(extractNum(input[coord.y], coord.x) || "");
      if (!nums.includes(num)) nums.push(num);
    }

    adjNums.push(...nums);
  }

  console.log(sum(adjNums));
};

// Solution 1:
const solve = (input: string[]) => sumAdjacentNums(input, findSymbols(input));
// solve(testInput);

// Pt. II
const asteriskIndices = (input: string) => {
  const regex = /\*/g;
  const indices: number[] = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    indices.push(match.index);
  }

  return indices;
};

const findAsterisks = (input: string[]) => {
  const coords: Point[] = [];
  let x = 0;
  let y = 0;

  for (let row of input) {
    for (let idx of asteriskIndices(row)) {
      coords.push({ x: idx, y });
    }

    y++;
  }

  return coords;
};

const sumGearRatios = (input: string[], symbols: Point[]) => {
  const gearRatios: number[] = [];

  for (let symbol of symbols) {
    const nums: number[] = [];
    const adjDigitCoords = checkAdjacent(input, symbol);

    for (let coord of adjDigitCoords) {
      const num = parseInt(extractNum(input[coord.y], coord.x) || "");
      if (!nums.includes(num)) nums.push(num);
    }

    if (nums.length === 2) gearRatios.push(nums[0] * nums[1]);
  }

  console.log(sum(gearRatios));
};

const solve2 = (input: string[]) => sumGearRatios(input, findAsterisks(input));
solve2(fileInput);
