import React from 'react';
import './style.scss';
import fotoPerfil from '../../assets/imgs/fotoPerfil.png';

const Modal = ({ isOpen, onClose, children, animationClass }) => {

  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('modal-menu-overlay')) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={`modal-menu-overlay ${animationClass}`} onClick={handleOverlayClick}>
          <div className={`modal-menu ${animationClass}`}>
            <div className="header">
              <img className="logo" src={require('../../assets/imgs/obj-deficiencia.png')} alt="logo" />
              <button className="close-button" onClick={onClose}>
                <span>X</span>
              </button>
            </div>
            <div className="userInfo">
              <div className="profile-circle">
                <img src={fotoPerfil} alt="Imagem de Perfil" />
              </div>
              <span className="userName">{arrayUser.nome}</span>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
