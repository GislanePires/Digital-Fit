import React from "react";
import "./style.scss";
import Button from "../Button";

const ModalMessage = ({ texto, handleShowModal }) => {
    return (
        <>
            <div className="modal-message-overlay" onClick={() => handleShowModal(false)}>
                <div className="modal-message">
                    <p>{texto}</p>
                    <Button onClick={() => handleShowModal(false)}>Ok</Button>
                </div>
            </div>
        </>
    );
};

export default ModalMessage;
