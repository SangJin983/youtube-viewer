import { useCallback, useState } from "react";
import Modal from "../components/Modal";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  const ModalWrapper = useCallback(
    ({ children }) => isOpen && <Modal onClose={close}>{children}</Modal>,
    [isOpen, close, Modal]
  );

  return { Modal: ModalWrapper, open, close };
};
