import { readFromFile } from "./utils";

//// Day 10: Pipe Maze

// Pt. I

// find starting point

type Point = { x: number; y: number };

const directions: [number, number][] = [
  [0, -1], // north
  [1, 0], // east
  [0, 1], // south
  [-1, 0], // west
];

const pieces: { [key: string]: [boolean, boolean, boolean, boolean] } = {
  "|": [true, false, true, false],
  "-": [false, true, false, true],
  L: [true, true, false, false],
  J: [true, false, false, true],
  "7": [false, false, true, true],
  F: [false, true, true, false],
  S: [true, true, true, true],
};

const testInput = `
.....
.S-7.
.|.|.
.L-J.
.....`;

const testInput2 = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const testInput3 = `
-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const fileInput = readFromFile(__dirname, "day-10.txt");
if (!fileInput) throw new Error("Error parsing file input.");

const findStartPos = (input: string[]): Point | undefined => {
  for (let i = 0; i < input.length; i++) {
    const startIdx = input[i].indexOf("S");
    if (startIdx > -1) return { x: startIdx, y: i };
  }
};

const parse = (input: string) => {
  const rows = input.trim().split("\n");
  const start = findStartPos(rows);

  if (!start) throw new Error("No start position found.");

  return { rows, start };
};

const move = (point: Point, dir: [number, number]): Point => ({
  x: point.x + dir[0],
  y: point.y + dir[1],
});

const from = (dir: number) => (dir + 2) % 4; // ex: input north -> from the south

const getChar = (point: Point, map: string[]) => map[point.y][point.x];

const valid = (point: Point, map: string[], seen: boolean[][], dir: number) => {
  if (
    point.x < 0 ||
    point.x >= map[0].length ||
    point.y < 0 ||
    point.y >= map.length
  )
    return false;

  if (seen[point.y][point.x]) return false;

  const nextChar = getChar(point, map);
  if (nextChar === ".") return false;
  if (nextChar === "S") return true;
  if (!pieces[nextChar][from(dir)]) return false;

  return true;
};

const findNext = (curr: Point, map: string[], seen: boolean[][]) => {
  for (const dir of Object.keys(directions).map((_, i) => i)) {
    const currChar = getChar(curr, map);
    if (!pieces[currChar][dir]) continue;

    const next = move(curr, directions[dir]);
    if (valid(next, map, seen, dir)) {
      // console.log(next, getChar(next, map), dir);
      seen[next.y][next.x] = true;
      return next;
    }
  }

  throw new Error(
    `No next tile found for point: [${curr.x}, ${curr.y}] a ${getChar(
      curr,
      map
    )}.`
  );
};

const findFurthestTile = ({
  rows,
  start,
}: {
  rows: string[];
  start: Point;
}) => {
  let seen: boolean[][] = [];

  for (let i = 0; i < rows.length; ++i) {
    seen.push(new Array(rows[0].length).fill(false));
  }

  let curr = findNext(start, rows, seen);
  let currChar = getChar(curr, rows);
  let path: string[] = [];
  path.push(currChar);
  while (currChar != "S") {
    curr = findNext(curr, rows, seen);
    currChar = getChar(curr, rows);
    path.push(currChar);
  }

  console.log("solution:", path.length / 2);
};

findFurthestTile(parse(fileInput));

// Pt. II

// TODO: Find enclosed tiles inside of loops
