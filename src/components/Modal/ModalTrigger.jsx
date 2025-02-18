import { useModal } from "./useModal";

const ModalTrigger = ({ children }) => {
  const { open } = useModal();

  return (
    <div className="modal-open" onClick={open}>
      {children}
    </div>
  );
};

export default ModalTrigger;
