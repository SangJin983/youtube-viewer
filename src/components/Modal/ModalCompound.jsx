import { createContext, useCallback, useState } from "react";
import "../../styles/Modal.css";
import ModalPortal from "./ModalPortal";
import ModalTrigger from "./ModalTrigger";

export const ModalContext = createContext(null);

const ModalCompound = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // 스크롤 잠금
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset"; // 스크롤 잠금해제
  }, [setIsOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalCompound.Content = ModalPortal;
ModalCompound.Trigger = ModalTrigger;

export default ModalCompound;
