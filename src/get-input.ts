import "https://deno.land/x/dotenv@v3.1.0/load.ts";

export async function getInput(year: number, day: number): Promise<string> {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;

  const storedInput = localStorage.getItem(url);
  if (storedInput !== null) {
    return storedInput;
  }

  const session = Deno.env.get("AOC_SESSION");
  if (session === null) {
    throw new Error("AOC_SESSION is not set");
  }

  const response = await fetch(url, {
    headers: { cookie: `session=${session}` },
  });
  const text = await response.text();

  localStorage.setItem(url, text);
  return text;
}
