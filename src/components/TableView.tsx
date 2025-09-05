import { useMemo, useState } from "react";
import type { Cell, CellId } from "../types";
import { clamp } from "../utilities";
import { useColumnPercentile, useRowSums } from "../helpers";
import { useAppDispatch, useAppState } from "../context/AppHooks";

export const TableView: React.FC = () => {
    const { matrix, M, N, X } = useAppState();
    const dispatch = useAppDispatch();
    const rowSums = useRowSums(matrix);
    const p60 = useColumnPercentile(matrix, N, 0.6);

    const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
    const [nearestIds, setNearestIds] = useState<Set<CellId>>(new Set());
    const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(null);

    const allCellsFlat = useMemo(() => matrix.flat(), [matrix]);

    const handleCellEnter = (cell: Cell) => {
        setHoveredCell(cell);
        const others = allCellsFlat.filter(c => c.id !== cell.id);
        const sorted = others.sort((a, b) => Math.abs(a.amount - cell.amount) - Math.abs(b.amount - cell.amount));
        const x = clamp(X, 0, Math.max(0, M * N - 1));
        setNearestIds(new Set(sorted.slice(0, x).map(c => c.id)));
    };
    const handleCellLeave = () => {
        setHoveredCell(null);
        setNearestIds(new Set());
    };

    if (M === 0 || N === 0) {
        return <div className="empty">Nothing to show. Set M and N above to generate the matrix.</div>;
    }

    return (
        <div className="table-wrapper">
            <table className="matrix">
                <thead>
                    <tr>
                        <th className="sticky-left">Row</th>
                        {Array.from({ length: N }, (_, j) => (
                            <th key={j}>Cell values N = {j + 1}</th>
                        ))}
                        <th className="sticky-right">Sum values</th>
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, i) => {
                        const sum = rowSums[i] ?? 0;
                        const maxInRow = row.reduce((m, c) => Math.max(m, c.amount), 0) || 1;
                        const showPercents = hoveredSumRowIndex === i;
                        return (
                            <tr key={i}>
                                <th className="rowhdr sticky-left">Cell Value M = {i + 1}</th>
                                {row.map((cell) => {
                                    const isNearest = nearestIds.has(cell.id);
                                    const isHovered = hoveredCell?.id === cell.id;
                                    const percentOfTotal = sum ? (cell.amount / sum) * 100 : 0;
                                    const percentOfMax = maxInRow ? (cell.amount / maxInRow) * 100 : 0;

                                    return (
                                        <td
                                            key={cell.id}
                                            className={
                                                "cell" +
                                                (isHovered ? " hovered" : "") +
                                                (isNearest ? " nearest" : "") +
                                                (showPercents ? " show-perc" : "")
                                            }
                                            onMouseEnter={() => handleCellEnter(cell)}
                                            onMouseLeave={handleCellLeave}
                                            onClick={() => dispatch({ type: "INCREMENT_CELL", cellId: cell.id })}
                                        >
                                            {showPercents && (
                                                <span className="heat" style={{ width: `${percentOfMax}%` }} aria-hidden />
                                            )}
                                            <span className="val">
                                                {showPercents ? `${percentOfTotal.toFixed(0)}%` : cell.amount}
                                            </span>
                                        </td>
                                    );
                                })}
                                <td
                                    className="sumcell sticky-right"
                                    onMouseEnter={() => setHoveredSumRowIndex(i)}
                                    onMouseLeave={() => setHoveredSumRowIndex(null)}
                                    title="Hover to see % of total and row heatmap"
                                >
                                    <div className="sumcell-inner">
                                        <strong>{sum}</strong>
                                        <button className="danger" onClick={(e) => { e.stopPropagation(); dispatch({ type: "REMOVE_ROW", rowIndex: i }); }}>Remove</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th className="sticky-left">60th percentile</th>
                        {Array.from({ length: N }, (_, j) => (
                            <td key={j} className="p60">{p60[j] ?? 0}</td>
                        ))}
                        <td className="sticky-right p60">—</td>
                    </tr>
                </tfoot>
            </table>

            <div className="legend">
                <span className="swatch hovered" /> hovered cell
                <span className="swatch nearest" /> X nearest by value
                <span className="swatch heat" /> row heat (on Sum hover)
            </div>
        </div>
    );
};