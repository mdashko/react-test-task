import type { Cell, Matrix } from "./types";

export const random3 = (): number => Math.floor(100 + Math.random() * 900); // 100..999 inclusive

export const generateRow = (N: number, startId: number): { row: Cell[]; nextId: number } => {
  let id = startId;
  const row: Cell[] = Array.from({ length: N }, () => ({ id: id++, amount: random3() }));
  return { row, nextId: id };
};

export const generateMatrix = (M: number, N: number, startId = 1): { matrix: Matrix; nextId: number } => {
  let id = startId;
  const rows: Matrix = [];
  for (let r = 0; r < M; r++) {
    const { row, nextId } = generateRow(N, id);
    rows.push(row);
    id = nextId;
  }
  return { matrix: rows, nextId: id };
};

// Clamp helper
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// 60th percentile with linear interpolation (p in [0,1])
export function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  const frac = idx - lo;
  return sorted[lo] * (1 - frac) + sorted[hi] * frac;
}
