//// Day 6: Wait For It

// Pt. I

// Clue: find least and most way to win, take difference

const min = (time: number, distLimit: number) => {
  for (let hold = 0; hold <= time; hold++) {
    if (hold * (time - hold) > distLimit) return hold;
  }
  return -1;
};

const max = (time: number, distLimit: number) => {
  for (let hold = time; hold >= 0; hold--) {
    if (hold * (time - hold) > distLimit) return hold;
  }
  return -1;
};

const waysToWin = (max: number, min: number) => max - min + 1;

type Race = {
  time: number;
  distance: number;
};

// Note: I just hardcoded races bc it was faster than parsing.
const races: Race[] = [{ time: 59707878, distance: 430121812131276 }];

const solve = (races: Race[]) => {
  const margins: number[] = [];
  for (const { time, distance } of races) {
    margins.push(waysToWin(max(time, distance), min(time, distance)));
  }
  const product = margins.reduce((acc, curr) => (acc *= curr), 1);
  console.log("answer:", product);
};

solve(races);
