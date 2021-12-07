import { getInput } from "./get-input.ts";

const MAX_POSITION = 1024;

function getCostToMoveToPosition(
  positions: number[],
  position: number,
  constantCost: boolean
): number {
  return positions.reduce((prev, curr) => {
    const difference = Math.abs(position - curr);
    const cost = constantCost
      ? difference
      : (difference * (difference + 1)) / 2;

    return prev + cost;
  }, 0);
}

function getCheapestCost(positions: number[], constantCost: boolean): number {
  let cheapestCost = Infinity;

  for (let position = 0; position < MAX_POSITION; position += 1) {
    const cost = getCostToMoveToPosition(positions, position, constantCost);

    if (cost < cheapestCost) {
      cheapestCost = cost;
    }
  }

  return cheapestCost;
}

const input = await getInput(2021, 7);
const crabPositions = input.split(",").map((number) => parseInt(number));

console.log("Part 1:", getCheapestCost(crabPositions, true));
console.log("Part 2:", getCheapestCost(crabPositions, false));
