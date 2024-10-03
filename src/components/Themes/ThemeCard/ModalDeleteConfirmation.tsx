import React from "react";
import "./styles/modal.css";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-lg font-semibold mb-4">
          Tem certeza de que deseja deletar o Assunto e todos os seus Links?
        </h2>
        <div className="flex justify-end modal-button">
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
          <button onClick={onConfirm} className="confirm-button">
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
