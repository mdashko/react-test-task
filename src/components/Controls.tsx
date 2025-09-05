import React, { useState } from "react";
import { clamp } from "../utilities";
import { useAppDispatch, useAppState } from "../context/AppHooks";

export const Controls: React.FC = () => {
    const { M, N, X, matrix } = useAppState();
    const dispatch = useAppDispatch();
    const maxX = Math.max(0, M * N - 1);

    const [m, setM] = useState(M);
    const [n, setN] = useState(N);
    const [x, setX] = useState(X);

    return (
        <div className="controls">
            <div className="field">
                <label>M (rows)</label>
                <input type="number" min={0} max={100} value={m} onChange={e => setM(+e.target.value)} />
            </div>
            <div className="field">
                <label>N (cols)</label>
                <input type="number" min={0} max={100} value={n} onChange={e => setN(+e.target.value)} />
            </div>
            <div className="field">
                <label>
                    X (nearest cells)
                    <span className="hint"> (0…{maxX})</span>
                </label>
                <input
                    type="number"
                    min={0}
                    max={maxX}
                    value={x}
                    onChange={e => setX(+e.target.value)}
                />
            </div>
            <div className="buttons">
                <button
                    onClick={() =>
                        dispatch({ type: "SET_DIMENSIONS", M: clamp(m, 0, 100), N: clamp(n, 0, 100), X: x })
                    }
                >
                    Apply size
                </button>
                <button
                    className="primary"
                    onClick={() =>
                        dispatch({ type: "SET_DIMENSIONS", M: clamp(m, 0, 100), N: clamp(n, 0, 100), X: x, regenerate: true })
                    }
                >
                    Regenerate
                </button>
                <button onClick={() => dispatch({ type: "ADD_ROW" })} disabled={matrix.length >= 100}>
                    + Add row
                </button>
            </div>
        </div>
    );
};