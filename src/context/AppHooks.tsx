import { useContext } from 'react';
import { AppStateCtx, AppDispatchCtx } from './contexts';

export const useAppState = () => {
    const ctx = useContext(AppStateCtx);
    if (!ctx) throw new Error("useAppState must be used within AppProvider");
    return ctx;
};

export const useAppDispatch = () => {
    const ctx = useContext(AppDispatchCtx);
    if (!ctx) throw new Error("useAppDispatch must be used within AppProvider");
    return ctx;
};