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
    <div className="modal-content bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Tem certeza de que deseja deletar o Assunto e todos os seus Links?
      </h2>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="cancel-button bg-gray-600 text-gray-100 px-4 py-2 rounded mr-2 hover:bg-gray-500"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="confirm-button bg-red-600 text-gray-100 px-4 py-2 rounded hover:bg-red-500"
        >
          Deletar
        </button>
      </div>
    </div>
  </div>
  );
};

export default ConfirmDeleteModal;
