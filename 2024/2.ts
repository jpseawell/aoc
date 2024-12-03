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

const isSafeReport = (report: number[]) => {
  const direction = Math.sign(report[1] - report[0]);

  for (let i = 1; i < report.length; i++) {
    const delta = report[i] - report[i - 1];

    if (Math.abs(delta) < 1 || Math.abs(delta) > 3) {
      return false;
    }

    if (direction * delta <= 0) {
      return false;
    }
  }

  return true;
};

const solution_part_2 = (reports: number[][]) => {
  let totalSafeReports = 0;

  for (const report of reports) {
    if (isSafeReport(report)) {
      totalSafeReports++;
      continue;
    }

    for (let i = 0; i < report.length; i++) {
      // remove the element at index i
      const newReport = report.slice(0, i).concat(report.slice(i + 1));

      if (isSafeReport(newReport)) {
        totalSafeReports++;
        break;
      }
    }
  }

  console.log({ totalSafeReports });
};

const reports = parseInput(readInput(FILE_NAME));
solution_part_2(reports); // Failed
