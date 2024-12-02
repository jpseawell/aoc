import { readInput } from "./utils";

const FILE_NAME = "day-2.txt";

const parseInput = (input: string[]): number[][] => {
  const reports: number[][] = [];

  for (let i = 0; i < input.length; i++) {
    const report = input[i].split(" ").map((n) => parseInt(n));
    reports.push(report);
  }

  return reports;
};

const solution_part_1 = (reports: number[][]) => {
  let totalSafeReports = 0;

  for (let i = 0; i < reports.length; i++) {
    const report = reports[i];

    const increasing = report[0] < report[1];
    for (let j = 0; j < report.length; j++) {
      if (j === report.length - 1) {
        totalSafeReports++;
        break;
      }

      const diff = report[j] - report[j + 1];

      if (isNaN(diff)) break;
      if (increasing && diff > 0) break;
      if (!increasing && diff < 0) break;

      const absDiff = Math.abs(diff);
      if (absDiff > 3) break;
      if (absDiff < 1) break;
    }
  }

  console.log({ totalSafeReports });
};

const validDiff = (levelA: number, levelB: number, increasing: boolean) => {
  const diff = levelA - levelB;
  if (isNaN(diff)) return false;
  if (increasing && diff > 0) return false;
  if (!increasing && diff < 0) return false;
  if (Math.abs(diff) > 3) return false;
  if (Math.abs(diff) < 1) return false;

  return true;
};

const findBadLevels = (report: number[]) => {
  const increasing = report[0] < report[1];
  const badLevels: number[] = [];

  for (let j = 0; j < report.length - 1; j++) {
    if (!validDiff(report[j], report[j + 1], increasing)) {
      badLevels.push(j);
    }
  }

  return badLevels;
};

const solution_part_2 = (reports: number[][]) => {
  let totalSafeReports = 0;

  for (let i = 0; i < reports.length; i++) {
    const report = reports[i];

    const badLevels = findBadLevels(report);

    if (badLevels.length === 0) {
      totalSafeReports++;
      continue;
    }

    console.log({ report, badLevels });
    let fixables = 0;
    for (const badLevel of badLevels) {
      const dampenedReport = report.filter((_, idx) => idx !== badLevel);
      const dampenedBadLevels = findBadLevels(dampenedReport);

      console.log({ dampenedReport, dampenedBadLevels });
      if (dampenedBadLevels.length === 0) {
        fixables++;
      }
    }

    if (fixables === 1) totalSafeReports++;
  }

  console.log({ totalSafeReports });
};

const reports = parseInput(readInput(FILE_NAME));
solution_part_2(reports); // Failed
