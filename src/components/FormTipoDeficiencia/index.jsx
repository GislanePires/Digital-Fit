import React, { useState, useEffect } from "react";
import { atualizarDeficiencia, postDeficiencia } from "./../../service/api/index";
import "./style.scss";

const FormTiposDeficiencia = ({ props }) => {
  const [deficiencia, setDeficiencia] = useState({
    nome: "",
    description: "",
  });
  const [podeEditar, setPodeEditar] = useState(false);
  const [buttonName, setButtonName] = useState("Cadastrar");

  useEffect(() => {
    if (props.id != null) {
      setPodeEditar(true);

      setDeficiencia({
        nome: props?.nome,
        description: props?.description,
      });

      setButtonName("Salvar");
      console.log(props);
    }
  }, [props]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeficiencia((prevObjetivo) => ({
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
      atualizarDeficiencia(props.id, deficiencia, config)
        .then((response) => {
          console.log(response.data);
          setDeficiencia({
            nome: "",
            description: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      postDeficiencia(deficiencia, config)
        .then((response) => {
          console.log(response.data);
          setDeficiencia({
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
          value={deficiencia.nome}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descrição:</label>
        <input
          className="inputCadastrarObjetivo"
          type="text"
          name="description"
          value={deficiencia.description}
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

export default FormTiposDeficiencia;