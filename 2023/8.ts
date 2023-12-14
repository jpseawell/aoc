//// Day 8: Haunted Wasteland

import { readFromFile } from "./utils";

// Pt. I

const fileInput = readFromFile(__dirname, "day-8.txt");
if (!fileInput) throw new Error("Error parsing file input.");

const testInput = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

const testInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

const testInput3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

const parseMap = (input: string) => {
  const parsed = input.trim().split("\n");
  const instructions = parsed.shift();
  if (!instructions) throw new Error("Error while parsing instructions");

  parsed.shift(); // remove empty line

  const nodes = parsed.reduce((acc, curr) => {
    const [key, vals] = curr.split(" = ");
    const parsedVals = vals.replace("(", "").replace(")", "").split(", ");

    return {
      ...acc,
      [key]: parsedVals,
    };
  }, {});

  return { instructions, nodes };
};

const translate = (instruction: string) => (instruction === "L" ? 0 : 1);

const navigate = (instructions: string, nodes: { [key: string]: string[] }) => {
  let counter = 0;
  let curr: string = nodes["AAA"][translate(instructions[0])];
  while (curr !== "ZZZ") {
    counter++;
    const nextDirection = translate(
      instructions[counter % instructions.length]
    );
    curr = nodes[curr][nextDirection];
  }

  console.log("steps", counter + 1);
};

// const { instructions, nodes } = parseMap(fileInput);
// navigate(instructions, nodes);

// Pt. II
const reachedEnd = (input: string[]) => {
  for (const str of input) {
    if (!str.endsWith("Z")) return false;
  }

  return true;
};

const navigate2 = ({
  instructions,
  nodes,
}: {
  instructions: string;
  nodes: { [key: string]: string[] };
}) => {
  const pointers: string[] = [];
  for (const key of Object.keys(nodes)) {
    if (key.endsWith("A")) pointers.push(key);
  }

  // let counter = 0;
  // while (!reachedEnd(pointers)) {
  //   const nextDirection = translate(
  //     instructions[counter % instructions.length]
  //   );

  //   for (let i = 0; i < pointers.length; i++) {
  //     pointers[i] = nodes[pointers[i]][nextDirection];
  //   }

  //   counter++;
  // }

  // console.log("steps:", counter);
};

navigate2(parseMap(testInput3));
