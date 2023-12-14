/// Day 5: If You Give A Seed A Fertilizer

import { testInput } from "./day-5-test-input";

import { readFromFile } from "./utils";

const fileInput = readFromFile(__dirname, "day-5.txt");
if (!fileInput) throw new Error("Error parsing file input.");

// Pt. I

/**
 * - Unmapped source #s = destination #s. Ex: (10) => 10
 * TODO: Find the lowest location number that corresponds to any of the initial seeds
 */

type AlmanacMap = [number, number, number][];

const inRange = (input: number, lo: number, hi: number) =>
  input >= lo && input < hi;

const convert = (input: number, map: AlmanacMap) => {
  for (let [dest, src, rng] of map) {
    if (inRange(input, src, src + rng)) return input - src + dest;
  }

  return input;
};

const extractSeeds = (input: string): number[] => {
  const seedsMatch = input.match(/seeds:\s+(\d+(?:\s+\d+)*)/);
  if (!seedsMatch || seedsMatch.length < 2) {
    throw new Error("Seeds not found in the input");
  }

  return seedsMatch[1].trim().split(/\s+/).map(Number);
};

// parse maps
const extractMaps = (input: string): AlmanacMap[] => {
  const mapRegex = /map:\s*([\s\S]*?)(?=\n\n|$)/g;
  const maps: AlmanacMap[] = [];

  let match;
  while ((match = mapRegex.exec(input)) !== null) {
    const mapLines = match[1].trim().split("\n");
    const map = mapLines.map((line) =>
      line.trim().split(/\s+/).map(Number)
    ) as AlmanacMap;
    maps.push(map);
  }

  return maps;
};

// Assumes maps follow the specified format
const seedToLocation = (seed: number, maps: AlmanacMap[]) => {
  let result = seed;
  for (let map of maps) {
    result = convert(result, map);
  }
  return result;
};

const findClosestSeedLocation = (almanac: string) => {
  const maps = extractMaps(almanac);
  const locations: number[] = [];

  for (let seed of extractSeeds(almanac)) {
    locations.push(seedToLocation(seed, maps));
  }

  return Math.min(...locations);
};

// console.log(findClosestSeedLocation(fileInput));

// Pt. II
const extractSeedPairs = (seedsAndRanges: number[]) => {
  const pairs: [number, number][] = [];
  for (let i = 0; i < seedsAndRanges.length; i += 2) {
    const start = seedsAndRanges[i];
    const range = seedsAndRanges[i + 1];
    pairs.push([start, range]);
  }
  return pairs;
};

const findClosestSeedLocation2 = (almanac: string) => {
  const maps = extractMaps(almanac);
  const locations: number[] = [];
  const pairs = extractSeedPairs(extractSeeds(almanac));
  console.log(pairs);

  for (let [start, range] of pairs) {
    for (let i = start; i < start + range; i++) {
      locations.push(seedToLocation(i, maps));
    }
  }

  return Math.min(...locations);
};

// FAIL: Too slow :/
// console.log("\nAnswer:", findClosestSeedLocation2(fileInput));
