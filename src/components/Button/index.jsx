import React from 'react';
import './style.scss';

const Button = ({ texto, onClick, typeColor }) => {
  const getButtonStyle = () => {
    if (typeColor === 'secundaria') {
      return 'cor-secundaria';
    }

    return 'cor-primaria';
  };

  return (
    <button className={"btn " + getButtonStyle()} onClick={onClick}>
      {texto}
    </button>
  );
};

export default Button;