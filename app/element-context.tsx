'use client';

import { createContext, ReactNode, useContext } from "react";
import Element from "./data/elements";

export const ElementalContext = createContext<Element[] | undefined>(undefined);

export function ElementalProvider({ children, elements }: { children: ReactNode, elements: Element[] }) {
  return (
    <ElementalContext.Provider value={elements}>
      {children}
    </ElementalContext.Provider>
  );
}

export function useElements() {
  const context = useContext(ElementalContext);
  if (context === undefined) {
    throw new Error('useElements must be used within an ElementalProvider');
  }
  return context;
}