import React, { useEffect, useState } from "react";
import { useObjetivosContext } from "../../context/ObjetivosContext";
import { useNavigate } from "react-router-dom";
import CheckBox from "../CheckBox";
import "@fontsource/roboto/400.css";
import "./style.scss";
import { getObjetivos } from "../../service/api";
import Button from "../Button";
import ModalMessage from "../ModelMessage";
import ToastNotification from "../ToastNotification";
import { toast } from "react-toastify";

const ObjetivosContainer = () => {
  const [todosObjetivos, setTodosObjetivos] = useState();
  const { setObjetivos } = useObjetivosContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowAlert = (show) => {
    toast.error("Selecione pelo menos 1 objetivo", {
      position: "top-right",
      draggable: true,
    });
  };

  useEffect(() => {
    buscaObjetivos();
  }, []);

  const buscaObjetivos = async () => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };
    try {
      const response = await getObjetivos(config);
      setTodosObjetivos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    const selectedValues = Array.from(checkboxes).map(
      (checkbox) => checkbox.id
    );

    if (selectedValues.length === 0) {
      handleShowAlert(true);
      return 0;
    } else {
      setObjetivos(selectedValues);
      navigate("/treinos");
    }
  };

  const handleVoltar = () => {
    console.log("Botão clicado!");
  };

  return (
    <div className="obj-container">
      <ToastNotification />
      {isModalOpen && (
        <ModalMessage
          texto="Selecione pelo menos 1 objetivo"
          handleShowModal={handleShowAlert}
        />
      )}
      <div className="containerOptions">
        <div className="options">
          {todosObjetivos?.map((objetivo) => {
            return (
              <div className="option" key={objetivo.id}>
                <CheckBox id={objetivo.nome} label={objetivo.nome} />
              </div>
            );
          })}
        </div>
        <div className="botoes">
        <button className="botaoObjetivo" onClick={handleVoltar}>Voltar</button>
        <button className="botaoObjetivo2" onClick={handleSave}>Avançar</button>
          {/* <Button
            texto="Voltar"
            typeColor="secundaria"
            onClick={handleVoltar}
          />
          <Button
            texto="Avançar"
            typeColor="primario"
            aria-label="salvar objetivos"
            onClick={handleSave}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ObjetivosContainer;
