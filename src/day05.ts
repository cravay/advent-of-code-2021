import bresenham from "https://esm.sh/bresenham?target=deno";
import { getInput } from "./get-input.ts";

const MAP_SIZE = 1024;

type Point = { x: number; y: number };
class Line {
  constructor(public from: Point, public to: Point) {}

  isStraight(): boolean {
    return this.from.x === this.to.x || this.from.y === this.to.y;
  }
}

class SeaMap {
  values: number[][];

  constructor(size = MAP_SIZE) {
    this.values = Array.from({ length: size }).map(() =>
      Array.from({ length: size }).map(() => 0)
    );
  }

  drawLine({ from, to }: Line) {
    for (const { x, y } of bresenham(from.x, from.y, to.x, to.y)) {
      this.values[y][x] += 1;
    }
  }

  forEachValue(fn: (value: number) => void): void {
    this.values.forEach((row) => row.forEach(fn));
  }
}

function parseLines(input: string): Line[] {
  const lines: Line[] = [];

  for (const match of input.matchAll(
    /^(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)$/gm
  )) {
    const { x1, y1, x2, y2 } = match.groups!;
    lines.push(
      new Line(
        { x: parseInt(x1), y: parseInt(y1) },
        { x: parseInt(x2), y: parseInt(y2) }
      )
    );
  }

  return lines;
}

function countDangerousPoints(lines: Line[]): number {
  const map = new SeaMap();

  lines.forEach((line) => map.drawLine(line));

  let dangerousPoints = 0;
  map.forEachValue((value) => {
    if (value > 1) {
      dangerousPoints += 1;
    }
  });

  return dangerousPoints;
}

const lines = parseLines(await getInput(2021, 5));
const straightLines = lines.filter((line) => line.isStraight());

console.log("Part 1:", countDangerousPoints(straightLines));
console.log("Part 2:", countDangerousPoints(lines));
