import { useMemo } from "react";
import type { Matrix } from "./types";
import { percentile } from "./utilities";

export function useRowSums(matrix: Matrix): number[] {
    return useMemo(() => matrix.map(row => row.reduce((sum, c) => sum + c.amount, 0)), [matrix]);
}

export function useColumnPercentile(matrix: Matrix, N: number, p = 0.6): number[] {
    return useMemo(() => {
        if (N === 0) return [];
        const cols: number[][] = Array.from({ length: N }, () => []);
        for (const row of matrix) {
            for (let j = 0; j < N; j++) cols[j].push(row[j]?.amount ?? 0);
        }
        return cols.map(col => +percentile(col, p).toFixed(1));
    }, [matrix, N, p]);
}

