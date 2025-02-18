import { createPortal } from "react-dom";
import { useModal } from "./useModal";

const ModalPortal = ({ children }) => {
  const { isOpen, close } = useModal();

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalPortal;
