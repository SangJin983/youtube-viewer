import { useContext } from "react";
import { ModalContext } from "./Modal";

export const useModal = () => {
  const modalState = useContext(ModalContext);

  if (modalState == null) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return modalState;
};
