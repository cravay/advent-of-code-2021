import { getInput } from "./get-input.ts";

function getFishCount(fishes: number[], days: number): number {
  const fishState = Array.from({ length: 9 }).map(() => 0);
  fishes.forEach((fish) => (fishState[fish] += 1));

  for (let day = 0; day < days; day += 1) {
    const zeroFishes = fishState.shift()!;
    fishState[6] += zeroFishes;
    fishState[8] = zeroFishes;
  }

  return fishState.reduce((prev, curr) => prev + curr);
}

const input = await getInput(2021, 6);
const fishes = input.split(",").map((number) => parseInt(number));

console.log("Part 1:", getFishCount(fishes, 80));
console.log("Part 2:", getFishCount(fishes, 256));
