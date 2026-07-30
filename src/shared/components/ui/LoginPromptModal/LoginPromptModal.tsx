import { Link } from "react-router-dom";
import Modal from "@/shared/components/ui/Modal/Modal";
import type { LoginPromptModalProps } from "./loginpromptmodal.type";
import styles from "./loginpromptmodal.module.css";

export default function LoginPromptModal({
  isOpen,
  onClose,
}: LoginPromptModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Accedi per continuare">
      <p>Per accedere a questa funzionalità devi prima effettuare il login.</p>
      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Annulla
        </button>
        <Link to="/auth/login" className="btn-primary" onClick={onClose}>
          Vai al login
        </Link>
      </div>
    </Modal>
  );
}
