import { getInput } from "./get-input.ts";

function countNumberOfIncreases(values: number[]): number {
  let increases = 0;

  for (let i = 0; i < values.length - 1; i += 1) {
    if (values[i + 1] > values[i]) {
      increases += 1;
    }
  }

  return increases;
}

function applySlidingWindow(values: number[]): number[] {
  const result: number[] = [];

  for (let i = 0; i < values.length - 2; i += 1) {
    result.push(values[i] + values[i + 1] + values[i + 2]);
  }

  return result;
}

const values = (await getInput(2021, 1))
  .split("\n")
  .map((line) => parseInt(line));

console.log("Part 1:", countNumberOfIncreases(values));
console.log("Part 2:", countNumberOfIncreases(applySlidingWindow(values)));
