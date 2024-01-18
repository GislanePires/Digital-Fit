import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function CalendarModal({ isOpen, onRequestClose, selectedDate }) {
 return (
   <Modal
     isOpen={isOpen}
     onRequestClose={onRequestClose}
     contentLabel="Modal de calendário"
   >
     <h2>Data selecionada: {selectedDate.toLocaleDateString()}</h2>
     <button onClick={onRequestClose}>Fechar</button>
   </Modal>
 );
}

export default CalendarModal;
