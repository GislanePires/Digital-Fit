import React, { useEffect, useState } from "react";
import { useTreinoContext } from "../../context/TreinoContext";
import Header from "../../components/Header";
import "./style.scss";
import { Navigate } from "react-router-dom";
import { api, getUsuariosById } from "../../service/api";
import ContainerTreino from "../../components/ContainerTreino";


const MeuTreino = () => {
  const { treino } = useTreinoContext();
  const [temParaplegia, setTemParaplegia] = useState();
  const userLogged = localStorage.getItem("userLogged");
  const arrayUser = JSON.parse(userLogged);
  const [treinosList, setTreinosList] = useState([]);

  useEffect(() => {
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };
    getUsuariosById(arrayUser?.id, config)
      .then((response) => {
        console.log(response.data.notepad);
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
    if (!treinosList?.includes(treino?.id)) {
      const attTreinos = [...treinosList, treino?.id];
      requisicao(attTreinos);
    } else {
      console.log("Treino already exists in the list");
    }
  };

  const requisicao = (attTreinos) => {
    console.log(attTreinos);
    const stringTreinos = JSON.stringify(attTreinos);
    const acessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    };
    return api
      .put(
        `usuarios/${arrayUser.id}`,
        {
          notepad: stringTreinos,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header greetings={`Olá, ${arrayUser?.nome}`}/>
      <ContainerTreino addMeusTreinos={addMeusTreinos} temParaplegia={temParaplegia} treino={treino} buttonState={false} timerState={true} spotifyState={true}/>
    </>
  );
};

export default MeuTreino;
