//// Day 4: Scratchcards

import { readLinesFromFile } from "../utils";

// Pt. I
const testInput = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

const fileInput = readLinesFromFile(__dirname, "input.txt");

type Scratchcard = {
  id: number;
  having: number[];
  winning: number[];
};

/**
 * Parses string of nums and returns array of numbers
 * @param input space separated string of numbers
 * @returns array of parsed numbers
 */
const strToNum = (input: string) =>
  input
    .trim()
    .split(" ")
    .filter((str) => str !== "")
    .map((str) => parseInt(str));

const parseCardId = (input: string) => {
  const id = input.match(/Card\s+(\d+)/)?.[1];
  if (!id) throw new Error(`Couldn't find card id in card: ${input}`);
  return parseInt(id);
};

const parseCard = (input: string): Scratchcard => {
  const semi = input.indexOf(":");
  const pipe = input.indexOf("|");
  const winning = strToNum(input.slice(semi + 1, pipe));
  const having = strToNum(input.slice(pipe + 1));

  const id = parseCardId(input);

  return {
    id,
    winning,
    having,
  };
};

const updateScore = (curr: number) => (curr === 0 ? 1 : (curr *= 2));

const scoreCard = ({ having, winning }: Scratchcard): number => {
  const h = new Set(having);

  let score = 0;
  for (let num of winning) if (h.has(num)) score = updateScore(score);

  return score;
};

const scoreCards = (input: string[]) => {
  let sum = 0;

  for (let card of input) {
    sum += scoreCard(parseCard(card));
  }

  console.log(sum);
};

scoreCards(fileInput);

// Pt. II
const scoreCard2 = ({ id, having, winning }: Scratchcard) => {
  const h = new Set(having);

  let matches = 0;
  for (let num of winning) {
    if (h.has(num)) matches++;
  }

  return Array.from({ length: matches }, (_, index) => id + 1 + index); // ids of copies won
};

const scoreCards2 = (input: string[]) => {
  const pile: string[] = [...input];

  let i = 0;
  while (i < pile.length) {
    let curr = pile[i];

    const copyIds = scoreCard2(parseCard(curr));
    const copies = copyIds.map((id) => input[id - 1]);
    pile.push(...copies);

    i++;
  }

  console.log(pile.length);
};

scoreCards2(fileInput);
