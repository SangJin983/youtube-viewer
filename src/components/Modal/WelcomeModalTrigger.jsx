import { useEffect } from "react";
import { useModal } from "./useModal";

const WelcomeModalTrigger = () => {
  const { open } = useModal();

  useEffect(() => {
    open();
  }, [open]);

  return null;
};

export default WelcomeModalTrigger;
