import React from 'react';
import './style.scss';

const ButtonTabela = ({texto,onClick, typeColor}) => {
    return (
        <button className={"btn-tabela" + ' ' + typeColor} onClick={onClick}>
          {texto}
        </button>
      );
};

export default ButtonTabela;