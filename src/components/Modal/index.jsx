import React from "react";
import "./style.scss";

function Modal({ isOpen, children }) {
    if (!isOpen) {
      return null;
    }
   
    return (
      <div className="modal-component">
        {children}
      </div>
    );
   }
   export default Modal;
   