import { readLinesFromFile } from "./utils";

//// Day 2: Cube Conundrum

// Pt. I

const testInput = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

const limits: { [key: string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};

const parseGameId = (input: string) => {
  const id = input.match(/Game (\d+)/)?.[1];
  if (!id) throw new Error(`Couldn't find game id in game: ${input}`);
  return parseInt(id);
};

const parseSets = (input: string) => {
  const semi = input.indexOf(":");

  return input
    .slice(semi + 1)
    .split(";")
    .map((set) => set.split(","));
};

const checkSets = (sets: string[][], limits: { [key: string]: number }) => {
  for (let set of sets) {
    const sums: { [key: string]: number } = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (let roll of set) {
      const number = parseInt(roll.trim().match(/(\d+)/g)?.[0] || "");
      const color = roll.trim().match(/(red|green|blue)/g)?.[0] || "";

      sums[color] += number;

      if (sums[color] > limits[color]) {
        // console.log(color, sums[color]);
        return false;
      }
    }
  }

  return true;
};

const checkGames = (games: string[], limits: { [key: string]: number }) => {
  let sum = 0;
  for (let game of games) {
    if (checkSets(parseSets(game), limits)) {
      // console.log(game);
      sum += parseGameId(game);
    }
  }
  console.log({ sum });
};

const fileInput = readLinesFromFile(__dirname, "input.txt");

// Solution 1:
checkGames(fileInput, limits);

// Pt. II

/**
 * TODO:
 * - find max of color in a set
 * - multiply together
 * - sum
 */
const fewestPerColor = (sets: string[][]) => {
  const fewest: { [key: string]: number } = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (let set of sets) {
    for (let roll of set) {
      const number = parseInt(roll.trim().match(/(\d+)/g)?.[0] || "");
      const color = roll.trim().match(/(red|green|blue)/g)?.[0] || "";

      if (number > fewest[color]) fewest[color] = number;
    }
  }

  return { ...fewest } as { red: number; green: number; blue: number };
};

const power = ({
  red,
  green,
  blue,
}: {
  red: number;
  green: number;
  blue: number;
}) => red * green * blue;

const sumGamePowers = (games: string[]) => {
  let sum = 0;

  for (let game of games) {
    sum += power(fewestPerColor(parseSets(game)));
  }

  console.log({ sum });
};

// Solution 2:
sumGamePowers(fileInput);
