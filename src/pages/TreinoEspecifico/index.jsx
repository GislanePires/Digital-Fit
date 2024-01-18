import React, { useEffect, useState } from "react";
import { useTreinoContext } from "../../context/TreinoContext";
import Header from "../../components/Header";
import "./style.scss";
import { Navigate } from "react-router-dom";
import { api, getUsuariosById } from "../../service/api";
import ContainerTreino from "../../components/ContainerTreino";
import { toast } from "react-toastify";
import ToastNotification from "./../../components/ToastNotification/index";

const TreinoEspecifico = () => {
  const { treino } = useTreinoContext();
  const [temParaplegia, setTemParaplegia] = useState();
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const [treinosList, setTreinosList] = useState([]);

  const handleSucess = (show) => {
    toast.success("Adicionado ao seus treinos", {
      position: "top-right",
      draggable: true,
    });
  };

  const handleAlreadyExists = (show) => {
    toast.error("Já está nos seus treinos", {
      position: "top-right",
      draggable: true,
    });
  };

  useEffect(() => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };
    getUsuariosById(arrayUser?.id, config)
      .then((response) => {
        if (response.data.notepad) {
          setTreinosList(JSON.parse(response.data.notepad));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [arrayUser?.id]);

  useEffect(() => {
    const result = arrayUser?.tipoDeficiencias.some(function (elemento) {
      return elemento.nome === "paraplegia";
    });
    setTemParaplegia(result);
  }, [arrayUser?.tipoDeficiencias]);

  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  if (treino == null) {
    return <Navigate to="/user-page" />;
  }

  const addMeusTreinos = () => {
    if (!treinosList.includes(treino.id)) {
      const attTreinos = [...treinosList, treino.id];
      requisicao(attTreinos);
    } else {
      handleAlreadyExists(true);
    }
  };

  const requisicao = async(attTreinos) => {
    const stringTreinos = JSON.stringify(attTreinos);
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };
    return await api
      .put(
        `usuarios/${arrayUser.id}`,
        {
          notepad: stringTreinos,
        },
        config
      )
      .then(() => {
        handleSucess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header greetings={`Olá, ${arrayUser?.nome}`} />
      <ToastNotification />
      <ContainerTreino
        addMeusTreinos={addMeusTreinos}
        temParaplegia={temParaplegia}
        treino={treino}
        buttonState={true}
      />
    </>
  );
};

export default TreinoEspecifico;
