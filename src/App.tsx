import React from "react";
import { AppProvider } from "./context/AppContext";
import { Controls } from "./components/Controls";
import { TableView } from "./components/TableView";

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="app">
        <h1>Matrix Nearest Cells Table</h1>
        <p className="subtitle">
          TypeScript + React Context • Click a cell to +1 • Hover a cell to highlight X nearest • Hover a row's
          Sum to show % of total and heatmap by row max. Add/Remove rows below.
        </p>
        <Controls />
        <TableView />
      </div>
    </AppProvider>
  );
};

export default App;
