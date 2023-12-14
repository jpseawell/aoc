//// Day 9: Mirage Maintenance

import { readLinesFromFile } from "./utils";

// Pt. I
const fileInput = readLinesFromFile(__dirname, "day-9.txt");
if (!fileInput) throw new Error("Error parsing file input.");

const testInput = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45 "];

const parse = (input: string) =>
  input
    .trim()
    .split(" ")
    .map((str) => parseInt(str));

const findDifferencesAndSum = (input: number[]) => {
  let sum = 0;
  const diffs: number[] = [];
  for (let i = 0; i < input.length - 1; i++) {
    const diff = input[i + 1] - input[i];
    diffs.push(diff);
    sum += diff;
  }
  return { diffs, sum };
};

const findSequences = (input: number[]) => {
  const sequences: number[][] = [input];
  let done = false;
  let curr = input;
  while (!done) {
    const { diffs, sum } = findDifferencesAndSum(curr);
    sequences.push(diffs);
    // console.log(diffs);
    curr = diffs;
    done = sum === 0;
  }
  return sequences;
};

const extrapolate = (sequences: number[][]) => {
  let idx = sequences.length - 1;
  let inc = 0;

  while (idx >= 0) {
    const curr = sequences[idx];
    const tmp = curr[curr.length - 1] + inc;
    curr.push(tmp);
    inc = tmp;
    idx--;
  }

  return sequences[0].pop();
};

const report = (
  input: string[],
  extrFunc: (sequences: number[][]) => number | undefined
) => {
  let sum = 0;
  for (const history of input) {
    const nextVal = extrFunc(findSequences(parse(history)));
    // console.log(nextVal);
    sum += nextVal || 0;
  }
  console.log(sum);
};

// report(testInput, extrapolate);

// Pt. II
const extrapolate2 = (sequences: number[][]) => {
  let idx = sequences.length - 1;
  let inc = 0;

  while (idx >= 0) {
    const curr = sequences[idx];
    const tmp = curr[0] - inc;
    curr.unshift(tmp);
    inc = tmp;
    idx--;
  }

  return sequences[0].shift();
};

report(fileInput, extrapolate2);
