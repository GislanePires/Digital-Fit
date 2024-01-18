import React, { useState, useEffect } from "react";
import { atualizarObjetivo, postObjetivos } from "./../../service/api/index";
import "./style.scss";

const FormObjetivos = ({ props }) => {
  const [objetivo, setObjetivo] = useState({
    nome: "",
    description: "",
  });
  const [podeEditar, setPodeEditar] = useState(false);
  const [buttonName, setButtonName] = useState("Cadastrar");

  useEffect(() => {
    if (props.id != null) {
      setPodeEditar(true);

      setObjetivo({
        nome: props?.nome,
        description: props?.description,
      });

      setButtonName("Salvar");
      console.log(props);
    }
  }, [props]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObjetivo((prevObjetivo) => ({
      ...prevObjetivo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };

    if (podeEditar) {
      atualizarObjetivo(props.id, objetivo, config)
        .then((response) => {
          console.log(response.data);
          setObjetivo({
            nome: "",
            description: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      postObjetivos(objetivo, config)
        .then((response) => {
          console.log(response.data);
          setObjetivo({
            nome: "",
            description: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <main className="CadastrarObjetivo">
      <form className="formCadastraObjetivo">
      <div>
        <label>Nome:</label>
        <input
          className="inputCadastrarObjetivo"
          type="text"
          name="nome"
          value={objetivo.nome}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descrição:</label>
        <input
          className="inputCadastrarObjetivo"
          type="text"
          name="description"
          value={objetivo.description}
          onChange={handleChange}
        />
      </div>
    </form>
    <div className="divButtonForm">
      <button className="buttonFormObjetivo" onClick={handleSubmit}>{buttonName}</button>
      </div>
  </main>
  );
};

export default FormObjetivos;