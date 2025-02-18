import { createContext, useCallback, useState } from "react";
import ModalPortal from "./ModalPortal";

export const ModalContext = createContext(null);

export const ModalCompound = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalCompound.Content = ModalPortal;
