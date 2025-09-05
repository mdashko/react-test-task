# Matrix Nearest

A React + TypeScript application built with Vite that generates and displays a dynamic matrix of numbers.  
The app allows you to:
- Generate a random matrix of 3-digit numbers.
- Increment cell values.
- Add or remove rows.
- Highlight the **X nearest cells** to the average of the table.
- Display **row sums** and a **60th percentile row** for columns.


## Features

- **Dynamic Matrix**: Randomly generated matrix with configurable rows (`M`) and columns (`N`).
- **Interactive Cells**: Click on a cell to increment its value.
- **Row Operations**:
  - Add new rows.
  - Remove specific rows.
- **Row Sums**: Each row has an additional column showing the sum of its values.
- **60th Percentile Row**: A special row displays the 60th percentile value of each column.
- **Highlight Nearest Cells**: Select a number `X` to highlight the `X` nearest cells to the average of all matrix values.
- **Good UX**: Responsive and styled table with clear interactions.

## Project Structure

matrix-nearest/
├── src/
│   ├── components/
│   │   ├── Controls.tsx       # Input controls for dimensions and nearest cells
│   │   ├── TableView\.tsx      # Table rendering logic
│   ├── context/
│   │   └── AppContext.tsx     # Context, reducer, and provider
│   ├── utilities.ts           # Helper functions (matrix generation, percentile, etc.)
│   ├── types.ts               # Type definitions (Cell, Matrix, State, Action)
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # React entry point
│   └── styles.css             # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md


## Installation & Setup

Make sure you have **Node.js (>=18)** and **npm** installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/matrix-nearest.git
   cd matrix-nearest
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser:

   ```
   http://localhost:5173
   ```


## Usage

1. Set the number of rows (**M**), columns (**N**), and nearest cells (**X**) in the controls.
2. A random matrix will be generated.
3. **Click on a cell** → increments its value by 1.
4. Use **Add Row** or **Remove Row** buttons to modify the matrix.
5. See the last row for **60th percentile values** per column.
6. Highlight the **X nearest cells** to the matrix average.


## Example

|         | Col 1 | Col 2 | Col 3 | Sum  |
| ------- | ----- | ----- | ----- | ---- |
| R1      | 123   | 456   | 789   | 1368 |
| R2      | 321   | 654   | 987   | 1962 |
| R3      | 234   | 345   | 678   | 1257 |
| **P60** | 280   | 500   | 800   | —    |

If `X=3`, the **3 cells closest to the overall average** are highlighted.


## Scripts

* `npm run dev` → Start development server
* `npm run build` → Build for production
* `npm run preview` → Preview production build
* `npm run lint` → Run ESLint checks


## Tech Stack

* [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/) – Fast build tool
* Context + Reducer for state management
* CSS for styling
