import React, { useState } from "react";
import "./style.css";
import CheckBox from "../../components/CheckBox"; 

function CheckCadastroDePerfil({ title, idCadastrar, idVisualizar, idEditar, idExcluir }) {
  const [options, setOptions] = useState({
    cadastrar: false,
    visualizar: false,
    editar: false,
    excluir: false,
  });

  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const imgbgPosition = "right";

  const handleCheckboxChange = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  return (
    <div className="bodyCadastroDePerfil">
      <div className="containerCadastroDePerfil">
        <div className="quadradoCadastro">
          <h5 className="tituloEditavel">{title}</h5>

          <CheckBox
            id={idCadastrar}
            label="Cadastrar"
            checked={options.cadastrar}
            handleCheckboxChange={() => handleCheckboxChange("cadastrar")}
          />

          <CheckBox
            id={idVisualizar}
            label="Visualizar"
            checked={options.visualizar}
            handleCheckboxChange={() => handleCheckboxChange("visualizar")}
          />

          <CheckBox
            id={idEditar}
            label="Editar"
            checked={options.editar}
            handleCheckboxChange={() => handleCheckboxChange("editar")}
          />

          <CheckBox
            id={idExcluir}
            label="Excluir"
            checked={options.excluir}
            handleCheckboxChange={() => handleCheckboxChange("excluir")}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckCadastroDePerfil;

