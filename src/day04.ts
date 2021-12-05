import { getInput } from "./get-input.ts";

const BOARD_SIZE = 5;

class BingoBoard {
  hasWon = false;
  score = 0;
  numbers: {
    marked: boolean;
    number: number;
  }[][] = [];

  addDrawnNumber(drawnNumber: number): void {
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      const row = this.numbers[y];

      for (let x = 0; x < BOARD_SIZE; x += 1) {
        const number = row[x];

        if (number.number === drawnNumber) {
          number.marked = true;
          this.checkWin(x, y);
        }
      }
    }
  }

  private checkWin(x: number, y: number): void {
    if (this.checkRowWin(y) || this.checkColumnWin(x)) {
      this.hasWon = true;
      this.score = this.calculateScore(this.numbers[y][x].number);
    }
  }

  private checkRowWin(y: number): boolean {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (!this.numbers[y][x].marked) {
        return false;
      }
    }

    return true;
  }

  private checkColumnWin(x: number): boolean {
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      if (!this.numbers[y][x].marked) {
        return false;
      }
    }

    return true;
  }

  private calculateScore(lastDrawnNumber: number): number {
    let unmarkedSum = 0;

    for (const row of this.numbers) {
      for (const { marked, number } of row) {
        if (!marked) {
          unmarkedSum += number;
        }
      }
    }

    return unmarkedSum * lastDrawnNumber;
  }
}

function parseBingoBoards(lines: string[]): BingoBoard[] {
  const boards: BingoBoard[] = [];

  for (let i = 0; i < lines.length; i += BOARD_SIZE + 1) {
    const board = new BingoBoard();
    boards.push(board);

    for (let ii = 0; ii < BOARD_SIZE; ii += 1) {
      board.numbers.push(
        lines[i + ii + 1]
          .trim()
          .split(/ +/)
          .map((number) => ({
            marked: false,
            number: parseInt(number),
          }))
      );
    }
  }

  return boards;
}

function getScoreOfWinner(
  drawnNumbers: number[],
  boards: BingoBoard[]
): number {
  for (const number of drawnNumbers) {
    boards.forEach((board) => board.addDrawnNumber(number));
    const winner = boards.find((board) => board.hasWon);

    if (winner) {
      return winner.score;
    }
  }

  return 0;
}

function getScoreOfLastWinner(
  drawnNumbers: number[],
  boards: BingoBoard[]
): number {
  for (const number of drawnNumbers) {
    boards.forEach((board) => board.addDrawnNumber(number));
    if (boards.length === 1 && boards[0].hasWon) {
      return boards[0].score;
    }

    boards = boards.filter((board) => !board.hasWon);
  }

  return 0;
}

const lines = (await getInput(2021, 4)).trim().split("\n");
const drawnNumbers = lines
  .splice(0, 1)[0]
  .split(",")
  .map((number) => parseInt(number));
const bingoBoards = parseBingoBoards(lines);

console.log("Part 1:", getScoreOfWinner(drawnNumbers, bingoBoards));
console.log("Part 2:", getScoreOfLastWinner(drawnNumbers, bingoBoards));
