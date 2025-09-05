import { createContext } from "react";
import type { Action, State } from "../types";

export const AppStateCtx = createContext<State | null>(null);
export const AppDispatchCtx = createContext<React.Dispatch<Action> | null>(null);