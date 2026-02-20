import { randInt } from "./math";

/**
 * Gets a random element of an array.
 * @param {any[]} arr
 * @example
 * sample([1, 2, 3]); // 2
 */
export const sample = (arr: any[]): any => arr[randInt(0, arr.length - 1)];

/**
 * Generates a string composed of `n` random characters.
 * @param {number} n
 * @example
 * generateRandomString(5); // "AXRF0"
 */
export const generateRandomString = (n: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let res = "";
  while (n--) res += sample(characters.split(""));
  return res;
};

/**
 * Generates sprite sheet coordinates.
 * @param rowCounts number of items in each row (top to bottom)
 * @param tileSize size of each tile in px (default 40)
 */
export function generateSpriteCoordinates(
  rowCounts: number[],
  tileSize: number = 40
): Record<number, { x: number; y: number }> {
  const coordinates: Record<number, { x: number; y: number }> = {};

  let index = 0;

  rowCounts.forEach((count, row) => {
    for (let col = 0; col < count; col++) {
      coordinates[index] = {
        x: -col * tileSize,
        y: -row * tileSize
      };
      index++;
    }
  });

  return coordinates;
}

type Op = "==" | "!=" | ">=" | "<=" | ">" | "<";

export type Condition =
  | { type: "flag"; key: string; op: Op; value: any }
  | { type: "stat"; stat: number; op: Op; value: number };

export function formatCondition(c: Condition): string {
  if (c.type === "flag") return `FLAG ${c.key} ${c.op} ${String(c.value)}`;
  if (c.type === "stat") return `STAT[${c.stat}] ${c.op} ${c.value}`;
  return "UNKNOWN";
}

export function formatConditions(conds?: Condition[] | null): string {
  if (!conds || conds.length === 0) return "";
  return conds.map(formatCondition).join(" AND ");
}
