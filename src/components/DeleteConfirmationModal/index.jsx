import React from "react";
import Modal from "react-modal";
import "./style.scss";

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation Modal"
      className="custom-modal" // Add a custom class to the modal
      overlayClassName="custom-overlay" // Add a custom class to the modal overlay
    >
      <div className="delete-modal-container">
        <p>Tem certeza que deseja deletar sua conta?</p>
        <div className="botoes-delete-modal">
          <button className="delete-account" onClick={onDelete}>Deletar</button>
          <button className="cancel-delete" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
