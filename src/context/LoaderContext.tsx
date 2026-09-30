import { createContext, useContext } from 'react';

export const LoaderContext = createContext<boolean>(false);

export const useLoader = (): boolean => useContext(LoaderContext);
