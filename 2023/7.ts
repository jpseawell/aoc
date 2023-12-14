//// Day 7: Camel Cards

import { StringMap, readLinesFromFile } from "./utils";

// Pt. I
const testInput = [
  "32T3K 765",
  "T55J5 684",
  "KK677 28",
  "KTJJT 220",
  "QQQJA 483",
];

const fileInput = readLinesFromFile(__dirname, "day-7.txt");

const parseHand = (input: string) => input.split(" ");

const types = {
  "five-of-a-kind": 1,
  "four-of-a-kind": 2,
  "full-house": 3,
  "three-of-a-kind": 4,
  "two-pair": 5,
  "one-pair": 6,
  "high-card": 7,
};

const cardVals: StringMap = {
  A: 13,
  K: 12,
  Q: 11,
  J: 1,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

const getType = (hand: string) => {
  const found: StringMap = {};

  let jokers = 0;
  for (const c of hand) {
    if (c === "J") jokers++;
    if (!found[c]) found[c] = 1;
    else found[c] += 1;
  }

  const vals = Object.values(found);
  const max = vals.reduce((max, curr) => (curr > max ? curr : max), 0);
  const maxWJokers = max + jokers;

  if (max === 5) return types["five-of-a-kind"];
  if (maxWJokers === 5) return types["five-of-a-kind"];

  if (max === 4) return types["four-of-a-kind"];
  if (maxWJokers === 4) return types["four-of-a-kind"];

  if (max === 3)
    return vals.includes(2) ? types["full-house"] : types["three-of-a-kind"];
  if (maxWJokers === 3)
    return vals.includes(2) ? types["full-house"] : types["three-of-a-kind"];

  if (max === 2)
    return vals.filter((val) => val === 2).length > 1
      ? types["two-pair"]
      : types["one-pair"];
  if (maxWJokers === 2) return types["one-pair"]; // J3TQ3

  return types["high-card"];
};

type RankedHands = { [key: number]: string[] };

const compare = (handA: string, handB: string) => {
  for (let i = 0; i < handA.length; i++) {
    if (handA[i] === handB[i]) continue;
    return cardVals[handA[i]] > cardVals[handB[i]] ? -1 : 1;
  }

  return 0;
};

const rankHands = (hands: string[]) => {
  const ranked: RankedHands = {};

  for (const hand of hands) {
    const rank = getType(hand);
    if (!ranked[rank]) ranked[rank] = [];
    ranked[rank].push(hand);
  }

  const keys = Object.keys(ranked).map((num) => parseInt(num));
  const vals = Object.values(ranked);
  for (let i = 0; i < vals.length; i++) {
    if (vals[i].length <= 1) continue;
    ranked[keys[i]] = vals[i].sort(compare);
  }

  return Object.values(ranked).flatMap((hand) => hand);
};

const scoreSet = (input: string[]) => {
  const handWithBids = input.map((row) => parseHand(row));
  const cardBidMap: StringMap = {};
  for (const [hand, bid] of handWithBids) {
    cardBidMap[hand] = parseInt(bid);
  }

  let sum = 0;
  const rankedHands = rankHands(handWithBids.map((handWBid) => handWBid[0]));
  for (let i = 0; i < rankedHands.length; i++) {
    const rank = rankedHands.length - i;
    sum += rank * cardBidMap[rankedHands[i]];
  }

  console.log(sum);
};

scoreSet(fileInput);
