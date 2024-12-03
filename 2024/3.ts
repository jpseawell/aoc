import { readInput, readInputAsSingle } from "./utils";

const process_line_1 = (input: string) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const validPairs: [number, number][] = [];

  const matches = Array.from(input.matchAll(regex));
  for (const match of matches) {
    validPairs.push([parseInt(match[1]), parseInt(match[2])]);
  }

  let sum = 0;
  for (let i = 0; i < validPairs.length; i++) {
    const [a, b] = validPairs[i];
    const product = a * b;
    sum += product;
  }

  return sum;
};

const solution_part_1 = (lines: string[]) => {
  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const result = process_line_1(line);
    sum += result;
  }

  console.log({ sum });
};

const process_line_2 = (input: string) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|(do\(\))|(don't\(\))/g;
  const validPairs: [number, number][] = [];

  let enabled = true;
  const matches = Array.from(input.matchAll(regex));
  for (const match of matches) {
    if (match[1] && match[2]) {
      if (enabled) validPairs.push([parseInt(match[1]), parseInt(match[2])]);
    } else if (match[3]) {
      enabled = true;
    } else if (match[4]) {
      enabled = false;
    }
  }

  let sum = 0;
  for (let i = 0; i < validPairs.length; i++) {
    const [a, b] = validPairs[i];
    const product = a * b;
    sum += product;
  }

  return sum;
};

const solution_part_2 = (line: string) => {
  const result = process_line_2(line);

  console.log({ result });
};

const FILE_NAME = "day-3.txt";

solution_part_1(readInput(FILE_NAME));
solution_part_2(readInputAsSingle(FILE_NAME));
