import { getInput } from "./get-input.ts";

type Direction = "forward" | "up" | "down";
interface Instruction {
  direction: Direction;
  units: number;
}

function parseInstructions(input: string): Instruction[] {
  const instructions: Instruction[] = [];

  for (const match of input.matchAll(/^(?<direction>\w+) (?<units>\d+)$/gm)) {
    instructions.push({
      direction: match!.groups!.direction as Direction,
      units: parseInt(match!.groups!.units),
    });
  }

  return instructions;
}

function getSubmarinePosition1(instructions: Instruction[]): {
  horizontalPosition: number;
  depth: number;
} {
  let horizontalPosition = 0;
  let depth = 0;

  for (const { direction, units } of instructions) {
    if (direction === "forward") {
      horizontalPosition += units;
    } else if (direction === "up") {
      depth -= units;
    } else if (direction === "down") {
      depth += units;
    }
  }

  return { horizontalPosition, depth };
}

function getSubmarinePosition2(instructions: Instruction[]): {
  horizontalPosition: number;
  depth: number;
} {
  let aim = 0;
  let horizontalPosition = 0;
  let depth = 0;

  for (const { direction, units } of instructions) {
    if (direction === "forward") {
      horizontalPosition += units;
      depth += aim * units;
    } else if (direction === "up") {
      aim -= units;
    } else if (direction === "down") {
      aim += units;
    }
  }

  return { horizontalPosition, depth };
}

const instructions = parseInstructions(await getInput(2021, 2));

const position1 = getSubmarinePosition1(instructions);
console.log("Part 1:", position1.horizontalPosition * position1.depth);

const position2 = getSubmarinePosition2(instructions);
console.log("Part 2:", position2.horizontalPosition * position2.depth);
