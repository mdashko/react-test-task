export type CellId = number; // unique across table
export type CellValue = number; // 3-digit random number
export type Cell = { id: CellId; amount: CellValue };

export type Matrix = Cell[][]; // rows of cells

export type State = {
    M: number;
    N: number;
    X: number; // number of nearest cells to highlight
    matrix: Matrix;
    nextId: number;
};

export type Action =
    | { type: "SET_DIMENSIONS"; M: number; N: number; X?: number; regenerate?: boolean }
    | { type: "INCREMENT_CELL"; cellId: CellId }
    | { type: "ADD_ROW" }
    | { type: "REMOVE_ROW"; rowIndex: number };
