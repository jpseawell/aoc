import * as fs from "fs";
import * as path from "path";

const FILE_NAME = "day-1.txt";

const readInput = () => {
  try {
    const absolutePath = path.resolve(__dirname, FILE_NAME);
    return fs.readFileSync(absolutePath, "utf-8").split(/\r?\n/);
  } catch (err) {
    console.error("Error reading the file:", err);
    return [];
  }
};

const parseInput = (input: string[]): [number[], number[]] => {
  if (!input) return [[], []];

  const leftList: number[] = [];
  const rightList: number[] = [];

  for (let i = 0; i < input.length; i++) {
    const [left, right] = input[i].split("   ").map((n) => parseInt(n));
    leftList.push(left);
    rightList.push(right);
  }

  return [leftList, rightList];
};

const solution_part_1 = (leftList: number[], rightList: number[]) => {
  // sort both lists
  const leftSorted = leftList.sort((a, b) => a - b);
  const rightSorted = rightList.sort((a, b) => a - b);

  // calc total distance
  let totalDistance = 0;

  for (let i = 0; i < leftSorted.length; i++) {
    const l = leftSorted[i];
    const r = rightSorted[i];
    totalDistance += Math.abs(l - r);
  }

  console.log({ totalDistance });
};

const [leftList, rightList] = parseInput(readInput());
// solution_part_1(leftList, rightList); // DONE!

const solution_part_2 = (leftList: number[], rightList: number[]) => {
  // sort both lists
  const leftSorted = leftList.sort((a, b) => a - b);
  const rightSorted = rightList.sort((a, b) => a - b);

  const occurences = new Map<number, number>();
  for (let i = 0; i < rightSorted.length; i++) {
    const r = rightSorted[i];
    occurences.set(r, (occurences.get(r) || 0) + 1);
  }

  let similarity = 0;
  for (let i = 0; i < leftSorted.length; i++) {
    const l = leftSorted[i];
    if (occurences.has(l)) {
      similarity += (occurences.get(l) || 0) * l;
    }
  }

  console.log({ similarity });
};

solution_part_2(leftList, rightList);
