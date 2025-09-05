import React, { useReducer } from "react";
import { clamp, generateMatrix, generateRow, random3 } from "../utilities";
import type { Action, Cell, Matrix, State } from "../types";
import { AppDispatchCtx, AppStateCtx } from "./contexts";

const initialState = (M = 5, N = 6, X = 5): State => {
    const { matrix, nextId } = generateMatrix(M, N, 1);
    const maxX = Math.max(0, M * N - 1);
    return { M, N, X: clamp(X, 0, maxX), matrix, nextId };
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_DIMENSIONS": {
            const M = clamp(action.M, 0, 100);
            const N = clamp(action.N, 0, 100);
            const maxX = Math.max(0, M * N - 1);
            const X = clamp(action.X ?? state.X, 0, maxX);

            if (action.regenerate) {
                const { matrix, nextId } = generateMatrix(M, N, 1);
                return { M, N, X, matrix, nextId };
            }

            let matrix: Matrix = state.matrix.map(row => row.slice(0, N));

            matrix = matrix.slice(0, M);
            let nextId = state.nextId;

            while (matrix.length < M) {
                const { row, nextId: nid } = generateRow(N, nextId);
                matrix.push(row);
                nextId = nid;
            }

            matrix = matrix.map(row => {
                if (row.length < N) {
                    const needed = N - row.length;
                    const added: Cell[] = Array.from({ length: needed }, () => ({ id: nextId++, amount: random3() }));
                    return row.concat(added);
                }
                return row;
            });

            return { M, N, X, matrix, nextId };
        }

        case "INCREMENT_CELL": {
            const matrix = state.matrix.map(row =>
                row.map(cell => (cell.id === action.cellId ? { ...cell, amount: cell.amount + 1 } : cell))
            );
            return { ...state, matrix };
        }

        case "ADD_ROW": {
            const { row, nextId } = generateRow(state.N, state.nextId);
            return { ...state, matrix: [...state.matrix, row], M: state.M + 1, nextId };
        }

        case "REMOVE_ROW": {
            const matrix = state.matrix.filter((_, i) => i !== action.rowIndex);
            return { ...state, matrix, M: Math.max(0, state.M - 1) };
        }

        default:
            return state;
    }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, undefined, () => initialState());
    return (
        <AppStateCtx.Provider value={state}>
            <AppDispatchCtx.Provider value={dispatch}>{children}</AppDispatchCtx.Provider>
        </AppStateCtx.Provider>
    );
};



