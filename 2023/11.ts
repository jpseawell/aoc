//// Day 11: Cosmic Expansion

import { readLinesFromFile } from "./utils";

// Pt. I
const testInput = [
  "...#......",
  ".......#..",
  "#.........",
  "..........",
  "......#...",
  ".#........",
  ".........#",
  "..........",
  ".......#..",
  "#...#.....",
];

const fileInput = readLinesFromFile(__dirname, "day-11.txt");
if (!fileInput) throw new Error("Error parsing file input.");

type Point = { x: number; y: number };
type FoundMap = { [key: number]: boolean };

const dist = (a: Point, b: Point) => {
  const distY = Math.abs(b.y - a.y);
  const distX = Math.abs(b.x - a.x);
  return distX + distY;
};

const solve = (input: string[], specialChar: string, expansionRate: number) => {
  const galaxies: Point[] = [];

  const occupied: { rows: FoundMap; cols: FoundMap } = {
    rows: {},
    cols: {},
  };

  let y = 0;
  for (const row of input) {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === specialChar) {
        galaxies.push({ x, y });
        occupied.rows[y] = true;
        occupied.cols[x] = true;
      }
    }
    y++;
  }

  const emptyRows = Object.assign(
    {},
    ...Array.from({ length: input.length }, (_, index) => index)
      .filter((row) => !occupied.rows[row])
      .map((empty) => ({ [empty]: true }))
  );

  const emptyCols = Object.assign(
    {},
    ...Array.from({ length: input[0].length }, (_, index) => index)
      .filter((col) => !occupied.cols[col])
      .map((empty) => ({ [empty]: true }))
  );

  for (const galaxy of galaxies) {
    let yIncrease = 0;
    for (const emptyRowIdx of Object.keys(emptyRows).map((key) =>
      parseInt(key)
    )) {
      if (galaxy.y > emptyRowIdx) yIncrease += expansionRate - 1;
    }

    let xIncrease = 0;
    for (const emptyColIdx of Object.keys(emptyCols).map((key) =>
      parseInt(key)
    )) {
      if (galaxy.x > emptyColIdx) xIncrease += expansionRate - 1;
    }

    galaxy.x += xIncrease;
    galaxy.y += yIncrease;
  }

  const paths: number[] = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      paths.push(dist(galaxies[i], galaxies[j]));
    }
  }

  const result = paths.reduce((sum, curr) => (sum += curr), 0);
  console.log(result);
};

solve(fileInput, "#", 1000000);
