import { getInput } from "./get-input.ts";

function getMostCommonBit(numbers: number[], index: number): 0 | 1 {
  let ones = 0;

  for (const number of numbers) {
    if (number & (1 << index)) {
      ones += 1;
    }
  }

  return ones >= numbers.length / 2 ? 1 : 0;
}

function getPowerConsumption(numbers: number[], bits: number): number {
  let gammaRate = 0;

  for (let i = 0; i < bits; i += 1) {
    gammaRate += getMostCommonBit(numbers, i) << i;
  }

  const epsilonRate = 2 ** bits - gammaRate - 1;
  return gammaRate * epsilonRate;
}

const enum RatingType {
  OXYGEN_GENERATOR_RATING,
  CO2_SCRUBBER_RATING,
}

function getRating(
  numbers: number[],
  ratingType: RatingType,
  index: number
): number {
  if (numbers.length === 1) {
    return numbers[0];
  }

  let bitToToss = getMostCommonBit(numbers, index);
  if (ratingType === RatingType.OXYGEN_GENERATOR_RATING) {
    bitToToss ^= 1;
  }
  const andMask = 1 << index;
  const xorMask = bitToToss << index;
  numbers = numbers.filter((number) => (number & andMask) ^ xorMask);

  return getRating(numbers, ratingType, index - 1);
}

function getLifeSupportRating(numbers: number[], bits: number): number {
  return (
    getRating(numbers, RatingType.OXYGEN_GENERATOR_RATING, bits) *
    getRating(numbers, RatingType.CO2_SCRUBBER_RATING, bits)
  );
}

const numberStrings = (await getInput(2021, 3)).split("\n");
const numbers = numberStrings.map((number) => parseInt(number, 2));
const bits = numberStrings[0].length;

console.log("Part 1:", getPowerConsumption(numbers, bits));
console.log("Part 2:", getLifeSupportRating(numbers, bits - 1));
